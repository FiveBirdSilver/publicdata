import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Program({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    wheelchairP: "",
    visuallyImpairedP: "",
    deafP: "",
    devdisabledP: "",
    seniorP: "",
    infantP: "",
  });
  const imagePickerOption = {
    mediaType: "photo",
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === "android",
  };

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <Section item={item} />
        <View style={styles.content}>
          <View style={styles.add}>
            <View style={styles.add_wrapper}>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>휠체어 이용자 체험 프로그램</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, wheelchairP: text };
                    })
                  }
                  value={value.wheelchairP}
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
                <Text style={styles.add_subtitle}>시각장애인 체험 프로그램</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, visuallyImpairedP: text };
                    })
                  }
                  value={value.visuallyImpairedP}
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
                <Text style={styles.add_subtitle}>청각장애인 체험 프로그램</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, deafP: text };
                    })
                  }
                  value={value.deafP}
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
                <Text style={styles.add_subtitle}>발달장애인 체험 프로그램</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, devdisabledP: text };
                    })
                  }
                  value={value.devdisabledP}
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
                <Text style={styles.add_subtitle}>시니어 체험 프로그램</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, seniorP: text };
                    })
                  }
                  value={value.seniorP}
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
                <Text style={styles.add_subtitle}>영유아 체험 프로그램</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, infantP: text };
                    })
                  }
                  value={value.infantP}
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
                {value.wheelchairP === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>휠체어 이용자 체험 프로그램</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.visuallyImpairedP === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>시각장애인 체험 프로그램</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.deafP === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>청각장애인 체험 프로그램</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.devdisabledP === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>발달장애인 체험 프로그램</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.seniorP === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>시니어 체험 프로그램</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.infantP === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>영유아 체험 프로그램</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
