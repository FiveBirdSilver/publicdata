import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";

import { styles } from "../../../assets/styles/add";

export default function Ad({ route, navigation }) {
  const { item } = route.params;
  const [wheelchair, setWheelchair] = useState("");
  const [stroller, setStroller] = useState("");
  const [babychair, setBabyChair] = useState("");

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
      <View style={styles.add_title_container}>
        <View style={styles.add_title_wrapper}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title} onPress={() => navigation.goBack()}>
              <AntDesign style={styles.icon} color="#00acb1" name="back" size={30} />
            </TouchableOpacity>
          </View>
          <Text>뒤로</Text>
        </View>
        <Text style={styles.add_title}>{item}</Text>

        <View style={styles.add_title_wrapper}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title}>
              <AntDesign style={styles.icon} color="#00acb1" name="save" size={30} />
            </TouchableOpacity>
          </View>
          <Text>저장</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.add}>
          <ScrollView style={styles.scrollview}>
            <View style={styles.add_wrapper}>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>휠체어</Text>
                <RadioButton.Group onValueChange={(v) => setWheelchair(v)} value={wheelchair} style={styles.yesorno}>
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
                <Text style={styles.add_subtitle}>유모차</Text>
                <RadioButton.Group onValueChange={(v) => setStroller(v)} value={stroller} style={styles.yesorno}>
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
                <Text style={styles.add_subtitle}>유아용 보조의자</Text>
                <RadioButton.Group onValueChange={(v) => setBabyChair(v)} value={babychair} style={styles.yesorno}>
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
                {wheelchair === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>휠체어</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {stroller === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>유모차</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {babychair === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>유아용 보조의자</Text>
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
