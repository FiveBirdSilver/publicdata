import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Door({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    sliding: "",
    hinged: "",
    automatic: "",
    revolving: "",
    etc: "",
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

  console.log(value.sliding);

  return (
    <View style={styles.container}>
      <Section item={item} />
      <View style={styles.content}>
        <View style={styles.add}>
          <ScrollView style={styles.scrollview}>
            <View style={styles.add_wrapper}>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>미닫이문 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, sliding: v };
                    })
                  }
                  value={value.sliding}
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
                <Text style={styles.add_subtitle}>여닫이문 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, hinged: v };
                    })
                  }
                  value={value.hinged}
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
                <Text style={styles.add_subtitle}>버튼식 자동문 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, automatic: v };
                    })
                  }
                  value={value.automatic}
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
                <Text style={styles.add_subtitle}>회전식 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, revolving: v };
                    })
                  }
                  value={value.revolving}
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
                <Text style={styles.add_subtitle}>기타 기재</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="name"
                    value={value.etc}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, etc: text };
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
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
