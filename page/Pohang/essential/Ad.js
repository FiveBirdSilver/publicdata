import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";

import { styles } from "../../../assets/styles/add";

import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";

export default function Ad({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    wheelchair: "",
    stroller: "",
    babychair: "",
  });
  // const [image, setImage] = useState({
  //   wheelchair_Image: "",
  //   stroller_Image: "",
  //   babychair_Image: "",
  // });
  const [image, setImage] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImg = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("성공", result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // let camera = "";

  // const [startCamera, setStartCamera] = useState(false);
  // const __startCamera = async () => {
  //   const { status } = await Camera.requestPermissionsAsync();
  //   if (status === "granted") {
  //     // start the camera
  //     setStartCamera(true);
  //   } else {
  //     Alert.alert("Access denied");
  //   }
  // };
  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <View style={styles.add_title_container}>
          <View style={styles.add_title_wrapper}>
            <View style={styles.icon_wrap}>
              <TouchableOpacity style={styles.footer_title} onPress={() => navigation.goBack()}>
                <AntDesign style={styles.icon} color="#00acb1" name="back" size={30} />
              </TouchableOpacity>
            </View>
            <Text>뒤로</Text>
          </View>
          <Text style={styles.add_title}>{item}</Text>

          <View style={styles.add_title_wrapper}>
            <View style={styles.icon_wrap}>
              <TouchableOpacity style={styles.footer_title}>
                <AntDesign style={styles.icon} color="#00acb1" name="save" size={30} />
              </TouchableOpacity>
            </View>
            <Text>저장</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.add}>
            <ScrollView style={styles.scrollview}>
              <View style={styles.add_wrapper}>
                <View style={styles.add_container}>
                  <Text style={styles.add_subtitle}>휠체어</Text>
                  <RadioButton.Group
                    onValueChange={(text) =>
                      setValue((prev) => {
                        return { ...prev, wheelchair: text };
                      })
                    }
                    value={value.wheelchair}
                    style={styles.yesorno}
                  >
                    <View style={styles.radio}>
                      <View style={styles.radio_wrap}>
                        <Text>있다</Text>
                        <RadioButton value="Y" />
                      </View>
                      <View style={styles.radio_wrap}>
                        <Text>없다</Text>
                        <RadioButton value="N" />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={styles.add_container}>
                  <Text style={styles.add_subtitle}>유모차</Text>
                  <RadioButton.Group
                    onValueChange={(text) =>
                      setValue((prev) => {
                        return { ...prev, stroller: text };
                      })
                    }
                    value={value.stroller}
                    style={styles.yesorno}
                  >
                    <View style={styles.radio}>
                      <View style={styles.radio_wrap}>
                        <RadioButton value="Y" />
                      </View>
                      <View style={styles.radio_wrap}>
                        <RadioButton value="N" />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={styles.add_container}>
                  <Text style={styles.add_subtitle}>유아용 보조의자</Text>
                  <RadioButton.Group
                    onValueChange={(text) =>
                      setValue((prev) => {
                        return { ...prev, babychair: text };
                      })
                    }
                    value={value.babychair}
                    style={styles.yesorno}
                  >
                    <View style={styles.radio}>
                      <View style={styles.radio_wrap}>
                        <RadioButton value="Y" />
                      </View>
                      <View style={styles.radio_wrap}>
                        <RadioButton value="N" />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={styles.img}>
                  {value.wheelchair === "Y" ? (
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>휠체어</Text>
                      <TouchableOpacity style={styles.imgchoose} onPress={uploadImg}>
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  {value.stroller === "Y" ? (
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>유모차</Text>
                      <TouchableOpacity style={styles.imgchoose} onPress={() => uploadImg("stroller")}>
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>
                  ) : null}
                  {value.babychair === "Y" ? (
                    <View style={styles.img_container}>
                      {/* <Camera style={{ flex: 1 }} type={type}> */}
                      <Text style={styles.img_container_title}>유아용 보조의자</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        // onPress={() => uploadImg("babychair")}
                        // onPress={__startCamera}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                      {/* </Camera> */}
                    </View>
                  ) : null}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
