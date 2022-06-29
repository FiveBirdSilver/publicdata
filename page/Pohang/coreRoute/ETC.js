import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function ETC({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    emergencybell: "",
    lightalarmdevice: "",
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
                <Text style={styles.add_subtitle}>비상벨 유무</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, emergencybell: text };
                    })
                  }
                  value={value.emergencybell}
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
                <Text style={styles.add_subtitle}>빛 확인 경보장치 유무</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, lightalarmdevice: text };
                    })
                  }
                  value={value.lightalarmdevice}
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
                {value.emergencybell === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>비상벨 유무</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.lightalarmdevice === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>빛 확인 경보장치 유무</Text>
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
