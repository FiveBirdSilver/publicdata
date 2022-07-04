import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Runway({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    runway: "",
    handle: "",
    handleBraille: "",
    slope: "",
    length: "",
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
                <Text style={styles.add_subtitle}>경사로 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, runway: v };
                    })
                  }
                  value={value.runway}
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
              {value.runway === "Y" ? (
                <>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>경사로 손잡이 유무</Text>
                    <RadioButton.Group
                      onValueChange={(v) =>
                        setValue((prev) => {
                          return { ...prev, handle: v };
                        })
                      }
                      value={value.handle}
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
                    <Text style={styles.add_subtitle}>경사로 손잡이 점자 유무 (시작과 끝)</Text>
                    <RadioButton.Group
                      onValueChange={(v) =>
                        setValue((prev) => {
                          return { ...prev, handleBraille: v };
                        })
                      }
                      value={value.handleBraille}
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
                </>
              ) : null}

              <View style={styles.img}>
                {value.runway === "Y" ? (
                  <>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>경사로 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>경사로 손잡이 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>경사로 손잡이 점자 유무 (시작과 끝)</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}
              </View>
              <View>
                {value.runway === "Y" ? (
                  <>
                    <View style={styles.add_input}>
                      <View style={styles.add_container}>
                        <Text style={styles.add_subtitle}>경사로 경사</Text>
                        <View style={styles.input_wrapper}>
                          <TextInput
                            name="slope"
                            value={value.slope}
                            onChangeText={(text) =>
                              setValue((prev) => {
                                return { ...prev, slope: text };
                              })
                            }
                            style={styles.input}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                    <View style={styles.add_input}>
                      <View style={styles.add_container}>
                        <Text style={styles.add_subtitle}>경사로 길이</Text>
                        <View style={styles.input_wrapper}>
                          <TextInput
                            name="length"
                            value={value.length}
                            onChangeText={(text) =>
                              setValue((prev) => {
                                return { ...prev, length: text };
                              })
                            }
                            style={styles.input}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
