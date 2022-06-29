import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Washstand({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    washstand: "",
    height: "",
    handle: "",
    temperatureBraile: "",
    childwashstand: "",
    wheelchairPossible: "",
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
                <Text style={styles.add_subtitle}>세면대 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, washstand: v };
                    })
                  }
                  value={value.washstand}
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
              {value.washstand === "Y" ? (
                <View style={styles.add_container}>
                  <Text style={styles.add_subtitle}>세면대 높이</Text>
                  <View style={styles.input_wrapper}>
                    <TextInput
                      name="name"
                      value={value.height}
                      onChangeText={(text) =>
                        setValue((prev) => {
                          return { ...prev, height: text };
                        })
                      }
                      style={value.washstand === "N" || value.washstand === "" ? null : styles.input}
                    ></TextInput>
                  </View>
                </View>
              ) : null}

              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>세면대 손잡이</Text>
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
                      <RadioButton value="Y" disabled={value.washstand === "N" ? true : false} />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" disabled={value.washstand === "N" ? true : false} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>냉온수 점자 구분 여부</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, temperatureBraile: v };
                    })
                  }
                  value={value.temperatureBraile}
                  style={styles.yesorno}
                >
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="Y" disabled={value.washstand === "N" ? true : false} />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" disabled={value.washstand === "N" ? true : false} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>어린이용 세면대 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, childwashstand: v };
                    })
                  }
                  value={value.childwashstand}
                  style={styles.yesorno}
                >
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="Y" disabled={value.washstand === "N" ? true : false} />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" disabled={value.washstand === "N" ? true : false} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>휠체어 탑승 세면대 사용 가능 여부</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, wheelchairPossible: v };
                    })
                  }
                  value={value.wheelchairPossible}
                  style={styles.yesorno}
                >
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="Y" disabled={value.washstand === "N" ? true : false} />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" disabled={value.washstand === "N" ? true : false} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.img}>
                {value.washstand === "Y" ? (
                  <>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>세면대 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>세면대 손잡이</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>냉온수 점자 구분 여부</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>어린이용 세면대 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>휠체어 탑승 세면대 사용 가능 여부</Text>
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
