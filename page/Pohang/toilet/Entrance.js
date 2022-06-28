import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Entrance({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    entrance: "",
    slope: "",
    length: "",
    width: "",
    roadchin: "",
    rodechinHeight: "",
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
                <Text style={styles.add_subtitle}>경사로 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, entrance: v };
                    })
                  }
                  value={value.entrance}
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
                <Text style={styles.add_subtitle}>경사</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="name"
                    value={value.slope}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, slope: text };
                      })
                    }
                    style={value.entrance === "N" || value.entrance === "" ? null : styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>길이</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="name"
                    value={value.length}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, length: text };
                      })
                    }
                    style={value.entrance === "N" || value.entrance === "" ? null : styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>유효폭</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="name"
                    value={value.width}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, width: text };
                      })
                    }
                    style={value.entrance === "N" || value.entrance === "" ? null : styles.input}
                  ></TextInput>
                </View>
              </View>
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
                      <RadioButton value="Y" />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
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
                    style={value.roadchin === "N" || value.roadchin === "" ? null : styles.input}
                  ></TextInput>
                </View>
              </View>

              <View style={styles.img}>
                {value.entrance === "Y" ? (
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
                ) : null}
                {value.roadchin === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>턱 유무</Text>
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
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
