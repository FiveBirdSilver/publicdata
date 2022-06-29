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
    toilet: "",
    genderDiv: "",
    genderDivSign: "",
    dotblock: "",
    useSign: "",
    emergencybell: "",
    name: "",
    address: "",
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
                <Text style={styles.add_subtitle}>화장실 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, toilet: v };
                    })
                  }
                  value={value.toilet}
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
              {value.toilet === "Y" ? (
                <>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>남녀별도 사용 가능 유무</Text>
                    <RadioButton.Group
                      onValueChange={(v) =>
                        setValue((prev) => {
                          return { ...prev, genderDiv: v };
                        })
                      }
                      value={value.genderDiv}
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
                    <Text style={styles.add_subtitle}>출입구 남/녀 구분 점자표지판 설치 유무</Text>
                    <RadioButton.Group
                      onValueChange={(v) =>
                        setValue((prev) => {
                          return { ...prev, genderDivSign: v };
                        })
                      }
                      value={value.genderDivSign}
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
                    <Text style={styles.add_subtitle}>출입구 전면 바닥 점형 블록 설치 유무</Text>
                    <RadioButton.Group
                      onValueChange={(v) =>
                        setValue((prev) => {
                          return { ...prev, dotblock: v };
                        })
                      }
                      value={value.dotblock}
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
                    <Text style={styles.add_subtitle}>화장실 사용 여부 외부 표시 확인 기능 유무</Text>
                    <RadioButton.Group
                      onValueChange={(v) =>
                        setValue((prev) => {
                          return { ...prev, useSign: v };
                        })
                      }
                      value={value.useSign}
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
                    <Text style={styles.add_subtitle}>비상벨 설치 유무</Text>
                    <RadioButton.Group
                      onValueChange={(v) =>
                        setValue((prev) => {
                          return { ...prev, emergencybell: v };
                        })
                      }
                      value={value.emergencybell}
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
                {value.toilet === "Y" ? (
                  <>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>화장실 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>남녀별도 사용 가능 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>출입구 남/녀 구분 점자표지판 설치 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>출입구 전면 바닥 점형 블록 설치 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>화장실 사용 여부 외부 표시 확인 기능 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>비상벨 설치 유무</Text>
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
              {value.toilet === "Y" ? (
                <>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>화장실 이름</Text>
                    <View style={styles.input_wrapper}>
                      <TextInput
                        name="name"
                        value={value.name}
                        onChangeText={(text) =>
                          setValue((prev) => {
                            return { ...prev, name: text };
                          })
                        }
                        style={styles.input}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>화장실 주소</Text>
                    <View style={styles.input_wrapper}>
                      <TextInput
                        name="name"
                        value={value.address}
                        onChangeText={(text) =>
                          setValue((prev) => {
                            return { ...prev, address: text };
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
        </View>
      </View>
    </ScrollView>
  );
}
