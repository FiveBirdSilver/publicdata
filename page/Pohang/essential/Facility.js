import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Facility({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    cartService: "",
    wheelchairLift: "",
    restPossible: "",
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
                <Text style={styles.add_subtitle}>이동 카트 서비스 제공</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, cartService: text };
                    })
                  }
                  value={value.cartService}
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
                <Text style={styles.add_subtitle}>휠체어 승하차용 리프트</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, wheelchairLift: text };
                    })
                  }
                  value={value.wheelchairLift}
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
                <Text style={styles.add_subtitle}>장애인 동반 휴식 가능 시설</Text>
                <RadioButton.Group
                  onValueChange={(text) =>
                    setValue((prev) => {
                      return { ...prev, restPossible: text };
                    })
                  }
                  value={value.restPossible}
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
                {value.cartService === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>이동 카트 서비스 제공</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.wheelchairLift === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>휠체어 승하차용 리프트</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.restPossible === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>장애인 동반 휴식 가능 시설</Text>
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
