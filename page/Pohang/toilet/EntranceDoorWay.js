import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function EntranceDoorWay({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    width: "",
    roadchin: "",
    rodechinHeight: "",
    doortype: "",
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
                <Text style={styles.add_subtitle}>턱 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, roadchin: v };
                    })
                  }
                  value={value.roadchin}
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
              {value.roadchin === "Y" ? (
                <View style={styles.add_container}>
                  <Text style={styles.add_subtitle}>턱 높이</Text>
                  <View style={styles.input_wrapper}>
                    <TextInput
                      name="name"
                      value={value.rodechinHeight}
                      onChangeText={(text) =>
                        setValue((prev) => {
                          return { ...prev, rodechinHeight: text };
                        })
                      }
                      style={styles.input}
                    ></TextInput>
                  </View>
                </View>
              ) : null}

              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>폭</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="name"
                    value={value.width}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, width: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>

              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>턱 높이</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="name"
                    value={value.doortype}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, doortype: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}