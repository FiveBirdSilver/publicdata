import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Footpath({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    foothPath: "",
    streetlamp: "",
    footpathMove: "",
    floorMaterial: "",
    waterspoutWidth: "",
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
                <Text style={styles.add_subtitle}>보행로 유무</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, foothPath: text };
                    })
                  }
                  value={value.foothPath}
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
                <Text style={styles.add_subtitle}>야간 조명 유무</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, streetlamp: text };
                    })
                  }
                  value={value.streetlamp}
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
                <Text style={styles.add_subtitle}>휠체어 이동 가능 유무</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, footpathMove: text };
                    })
                  }
                  value={value.footpathMove}
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
                {value.foothPath === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>보행로</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.streetlamp === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>야간 조명</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.footpathMove === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>휠체어</Text>
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
              <View>
                {value.foothPath === "Y" ? (
                  <View style={styles.add_input}>
                    <View style={styles.add_container}>
                      <Text style={styles.add_subtitle}>바닥 재질</Text>
                      <View style={styles.input_wrapper}>
                        <TextInput
                          name="floorMaterial"
                          value={value.floorMaterial}
                          onChangeText={(text) =>
                            setValue((prev) => {
                              return { ...prev, floorMaterial: text };
                            })
                          }
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>
                    <View style={styles.add_container}>
                      <Text style={styles.add_subtitle}>배수 트렌치 간격</Text>
                      <View style={styles.input_wrapper}>
                        <TextInput
                          name="waterspoutWidth"
                          value={value.waterspoutWidth}
                          onChangeText={(text) =>
                            setValue((prev) => {
                              return { ...prev, waterspoutWidth: text };
                            })
                          }
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>
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
