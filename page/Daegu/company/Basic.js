import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Basic({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    name: "골든플래닛",
    address: "서울시 강남구 언주로",
    busiNum: "",
    phoneNum: "",
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
                <Text style={styles.add_subtitle}>업체명</Text>
                <View style={styles.input_wrapper}>
                  <TextInput name="name" value={value.name} style={styles.input}></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>업체 주소</Text>
                <View style={styles.input_wrapper}>
                  <TextInput name="name" value={value.address} style={styles.input}></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>사업자 등록번호</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="name"
                    value={value.busiNum}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, busiNum: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>전화번호</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="name"
                    value={value.phoneNum}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, phoneNum: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.img}>
                <View style={styles.img_container}>
                  <Text style={styles.img_container_title}>사진 1</Text>
                  <TouchableOpacity
                    style={styles.imgchoose}
                    onLaunchCamera={onLaunchCamera}
                    onLaunchImageLibrary={onLaunchImageLibrary}
                  >
                    <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                  </TouchableOpacity>
                </View>
                <View style={styles.img_container}>
                  <Text style={styles.img_container_title}>사진 2</Text>
                  <TouchableOpacity
                    style={styles.imgchoose}
                    onLaunchCamera={onLaunchCamera}
                    onLaunchImageLibrary={onLaunchImageLibrary}
                  >
                    <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
