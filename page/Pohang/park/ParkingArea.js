import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function ParkingArea({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    count: "",
    disabledCount: "",
    disabledWidth: "",
    disabledLength: "",
    pregnantCount: "",
    busCount: "",
    electricCount: "",
    disabledSign: "",
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
              <View>
                <View style={styles.add_input}>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>총 주차 면수</Text>
                    <View style={styles.input_wrapper}>
                      <TextInput
                        name="name"
                        value={value.count}
                        onChangeText={(text) =>
                          setValue((prev) => {
                            return { ...prev, count: text };
                          })
                        }
                        style={styles.input}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>장애인 주차 면수</Text>
                    <View style={styles.input_wrapper}>
                      <TextInput
                        name="name"
                        value={value.disabledCount}
                        onChangeText={(text) =>
                          setValue((prev) => {
                            return { ...prev, disabledCount: text };
                          })
                        }
                        style={styles.input}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>장애인 주차 면적 가로</Text>
                    <View style={styles.input_wrapper}>
                      <TextInput
                        name="name"
                        value={value.disabledWidth}
                        onChangeText={(text) =>
                          setValue((prev) => {
                            return { ...prev, disabledWidth: text };
                          })
                        }
                        style={styles.input}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>장애인 주차 면적 세로</Text>
                    <View style={styles.input_wrapper}>
                      <TextInput
                        name="name"
                        value={value.disabledLength}
                        onChangeText={(text) =>
                          setValue((prev) => {
                            return { ...prev, disabledLength: text };
                          })
                        }
                        style={styles.input}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>임산부 주차 면수</Text>
                    <View style={styles.input_wrapper}>
                      <TextInput
                        name="name"
                        value={value.pregnantCount}
                        onChangeText={(text) =>
                          setValue((prev) => {
                            return { ...prev, pregnantCount: text };
                          })
                        }
                        style={styles.input}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>대형버스 주차 면수</Text>
                    <View style={styles.input_wrapper}>
                      <TextInput
                        name="name"
                        value={value.busCount}
                        onChangeText={(text) =>
                          setValue((prev) => {
                            return { ...prev, busCount: text };
                          })
                        }
                        style={styles.input}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>전기차 주차 면수</Text>
                    <View style={styles.input_wrapper}>
                      <TextInput
                        name="name"
                        value={value.electricCount}
                        onChangeText={(text) =>
                          setValue((prev) => {
                            return { ...prev, electricCount: text };
                          })
                        }
                        style={styles.input}
                      ></TextInput>
                    </View>
                  </View>
                </View>
                <View style={styles.add_container}>
                  <Text style={styles.add_subtitle}>장애인 주차구역 표지판</Text>
                  <RadioButton.Group
                    onValueChange={(v) =>
                      setValue((prev) => {
                        return { ...prev, disabledSign: v };
                      })
                    }
                    value={value.disabledSign}
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
              </View>
              <View style={styles.img}>
                {value.disabledSign === "Y" ? (
                  <>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>장애인 주차장</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>장애인 주차구역 표지판</Text>
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
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
