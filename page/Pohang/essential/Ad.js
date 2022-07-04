import { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, Dimensions, Modal, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { RadioButton } from "react-native-paper";
import * as MediaLibrary from "expo-media-library";

import { styles } from "../../../assets/styles/add";

import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";

export default function Ad({ route, navigation }) {
  const ref = useRef(null);
  const { width, height } = Dimensions.get("window");
  const { item } = route.params;
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const ALBUM_NAME = "publicData";
  const [hasPermission, setHasPermission] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoIng, setPhotoIng] = useState(true);
  const [value, setValue] = useState({
    wheelchair: "",
    stroller: "",
    babychair: "",
  });
  const [image, setImage] = useState({
    wheelchair_Image: "",
    stroller_Image: "",
    babychair_Image: "",
  });

  // 갤러리에서 이미지 선택
  const uploadImg = async (name) => {
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
    SaveImg(name, result.uri);
  };

  // 이미지 저장
  const SaveImg = (name, Imguri) => {
    if (name === "wheelchair") {
      setImage((image) => ({
        ...image,
        wheelchair_Image: Imguri,
      }));
    } else if (name === "stroller") {
      setImage((image) => ({
        ...image,
        stroller_Image: Imguri,
      }));
    } else if (name === "babychair") {
      setImage((image) => ({
        ...image,
        babychair_Image: Imguri,
      }));
    }
  };

  const cancleImg = (name) => {
    if (name === "wheelchair") {
      setImage((image) => ({
        ...image,
        wheelchair_Image: "",
      }));
    } else if (name === "stroller") {
      setImage((image) => ({
        ...image,
        stroller_Image: "",
      }));
    } else if (name === "babychair") {
      setImage((image) => ({
        ...image,
        babychair_Image: "",
      }));
    }
  };

  const onCamera = async (name) => {
    setPhotoName(name);
    setPhotoIng(true);
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };
  if (hasPermission === true && photoIng) {
    return (
      <>
        <Camera
          style={{
            width: width,
            height: height,
            justifyContent: "center",
            overflow: "hidden",
          }}
          ref={ref}
          type={CameraType.back}
        >
          <View style={styles.cameraContainer}>
            <TouchableOpacity
              onPress={async () => {
                const options = { quality: 1, base64: true };
                const data = await ref.current.takePictureAsync(options);
                if (data.uri) {
                  SaveImg(photoName, data.uri);
                  setPhotoIng(false);
                  try {
                    const { status } = await requestPermission();
                    if (status === "granted") {
                      const asset = await MediaLibrary.createAssetAsync(data.uri);
                      let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
                      if (album === null) {
                        album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset);
                      } else {
                        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
                      }
                    } else {
                      setHasPermission(false);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
            >
              <View style={styles.camera}>
                <FontAwesome color="white" name="circle" size={70} />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </>
    );
  }
  // const [modalVisible, setModalVisible] = useState(false);

  if (hasPermission === false) {
    return <Alert>카메라 접근 권한을 허용해주세요</Alert>;
  }
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
                      {image.wheelchair_Image === "" || image.wheelchair_Image === undefined ? (
                        <TouchableOpacity style={styles.imgchoose} onPress={() => uploadImg("wheelchair")}>
                          <AntDesign style={styles.icon} color="white" name="pluscircle" size={30} />
                        </TouchableOpacity>
                      ) : (
                        image.wheelchair_Image && (
                          <View>
                            <TouchableOpacity style={styles.imgcancle} onPress={() => cancleImg("wheelchair")}>
                              <AntDesign style={styles.icon} color="red" name="minuscircle" size={30} />
                            </TouchableOpacity>
                            <Image source={{ uri: image.wheelchair_Image }} style={styles.imgchoose} />
                          </View>
                        )
                      )}
                    </View>
                  ) : null}
                  {value.stroller === "Y" ? (
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>유모차</Text>
                      {image.stroller_Image === "" || image.stroller_Image === undefined ? (
                        <TouchableOpacity style={styles.imgchoose} onPress={() => uploadImg("stroller")}>
                          <AntDesign style={styles.icon} color="white" name="pluscircle" size={30} />
                        </TouchableOpacity>
                      ) : (
                        image.stroller_Image && (
                          <View>
                            <TouchableOpacity style={styles.imgcancle} onPress={() => cancleImg("stroller")}>
                              <AntDesign style={styles.icon} color="red" name="minuscircle" size={30} />
                            </TouchableOpacity>
                            <Image source={{ uri: image.stroller_Image }} style={styles.imgchoose} />
                          </View>
                        )
                      )}
                    </View>
                  ) : null}
                  {/* {value.babychair === "Y" ? (
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>유아용 보조의자</Text>
                      {image.babychair_Image === "" || image.babychair_Image === undefined ? (
                        <TouchableOpacity style={styles.imgchoose} onPress={() => uploadImg("babychair")}>
                          <AntDesign style={styles.icon} color="white" name="pluscircle" size={30} />
                        </TouchableOpacity>
                      ) : (
                        image.babychair_Image && (
                          <View>
                            <TouchableOpacity style={styles.imgcancle} onPress={() => cancleImg("babychair")}>
                              <AntDesign style={styles.icon} color="red" name="minuscircle" size={30} />
                            </TouchableOpacity>
                            <Image source={{ uri: image.babychair_Image }} style={styles.imgchoose} />
                          </View>
                        )
                      )}
                    </View>
                  ) : null} */}
                  {value.babychair === "Y" ? (
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>유아용 보조의자</Text>
                      <TouchableOpacity style={styles.imgchoose} onPress={() => onCamera("babychair")}>
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={30} />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                {/* <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => onCamera("babychair")}>
                          <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                </View> */}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
