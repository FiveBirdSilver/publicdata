import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function DisabledToilet({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    disabledToilet: "",
    doortype: "",
    urinalHandle: "",
    toiletHandle: "",
    automaticeSensor: "",
    leftWidth: "",
    rightWidth: "",
    backWidth: "",
    frontWidth: "",
    cleandevice: "",
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
    <View style={styles.container}>
      <Section item={item} />
      <View style={styles.content}>
        <View style={styles.add}>
          <ScrollView style={styles.scrollview}>
            <View style={styles.add_wrapper}>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>장애인 화장실 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, disabledToilet: v };
                    })
                  }
                  value={value.disabledToilet}
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
                <Text style={styles.add_subtitle}>문 유형</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="name"
                    value={value.doortype}
                    placeholder="EX. 여닫이 문"
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, doortype: text };
                      })
                    }
                    style={value.disabledToilet === "N" || value.disabledToilet === "" ? null : styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>소변기 좌우 손잡이 설치 여부</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, urinalHandle: v };
                    })
                  }
                  value={value.urinalHandle}
                  style={styles.yesorno}
                >
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton
                        value="Y"
                        disabled={value.disabledToilet === "N" || value.disabledToilet === "" ? true : false}
                      />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton
                        value="N"
                        disabled={value.disabledToilet === "N" || value.disabledToilet === "" ? true : false}
                      />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>대변기 좌우 손잡이 설치 여부</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, toiletHandle: v };
                    })
                  }
                  value={value.toiletHandle}
                  style={styles.yesorno}
                >
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton
                        value="Y"
                        disabled={value.disabledToilet === "N" || value.disabledToilet === "" ? true : false}
                      />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton
                        value="N"
                        disabled={value.disabledToilet === "N" || value.disabledToilet === "" ? true : false}
                      />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>버튼식/자동센서 물 내림 여부</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, automaticeSensor: v };
                    })
                  }
                  value={value.automaticeSensor}
                  style={styles.yesorno}
                >
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton
                        value="Y"
                        disabled={value.disabledToilet === "N" || value.disabledToilet === "" ? true : false}
                      />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton
                        value="N"
                        disabled={value.disabledToilet === "N" || value.disabledToilet === "" ? true : false}
                      />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>세정장치</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, cleandevice: v };
                    })
                  }
                  value={value.cleandevice}
                  style={styles.yesorno}
                >
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton
                        value="Y"
                        disabled={value.disabledToilet === "N" || value.disabledToilet === "" ? true : false}
                      />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton
                        value="N"
                        disabled={value.disabledToilet === "N" || value.disabledToilet === "" ? true : false}
                      />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.img}>
                {value.disabledToilet === "Y" ? (
                  <>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>장애인 화장실</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>장애인 화장실 문</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>소변기 좌우 손잡이</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>대변기 좌우 손잡이</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>버튼식/자동센서 물 내림</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.add_container}>
                      <Text style={styles.add_subtitle}>대/소변기(좌~벽)</Text>
                      <View style={styles.input_wrapper}>
                        <TextInput
                          name="name"
                          value={value.leftWidth}
                          placeholder="EX. 100"
                          onChangeText={(text) =>
                            setValue((prev) => {
                              return { ...prev, leftWidth: text };
                            })
                          }
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>

                    <View style={styles.add_container}>
                      <Text style={styles.add_subtitle}>대/소변기(우~벽)</Text>
                      <View style={styles.input_wrapper}>
                        <TextInput
                          name="name"
                          placeholder="EX. 100"
                          value={value.rightWidth}
                          onChangeText={(text) =>
                            setValue((prev) => {
                              return { ...prev, rightWidth: text };
                            })
                          }
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>

                    <View style={styles.add_container}>
                      <Text style={styles.add_subtitle}>대/소변기(~벽)</Text>
                      <View style={styles.input_wrapper}>
                        <TextInput
                          name="name"
                          placeholder="EX. 100"
                          value={value.backWidth}
                          onChangeText={(text) =>
                            setValue((prev) => {
                              return { ...prev, backWidth: text };
                            })
                          }
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>

                    <View style={styles.add_container}>
                      <Text style={styles.add_subtitle}>대/소변기(~출입문)</Text>
                      <View style={styles.input_wrapper}>
                        <TextInput
                          name="name"
                          placeholder="EX. 100"
                          value={value.frontWidth}
                          onChangeText={(text) =>
                            setValue((prev) => {
                              return { ...prev, frontWidth: text };
                            })
                          }
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
