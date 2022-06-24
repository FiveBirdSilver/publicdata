import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Header from "../../component/Header";
import { styles } from "../../assets/styles/add";

export default function Recommend({ route, navigation }) {
  const { item } = route.params;
  const [cos, setCos] = useState("");
  const [season, setSeason] = useState("");

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
  const SeasonData = [
    {
      id: "0",
      label: "봄",
    },
    {
      id: "1",
      label: "여름",
    },
    {
      id: "2",
      label: "가을",
    },
    {
      id: "3",
      label: "겨울",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.add_title_container}>
        <View style={styles.add_title_wrapper}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title}>
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
      <View style={styles.add}>
        <View style={styles.add_wrapper}>
          <View style={styles.add_container}>
            <Text style={styles.add_subtitle}>추천코스</Text>
            <View style={styles.input_wrapper}>
              <TextInput name="cos" value={cos} onChangeText={(text) => setCos(text)} style={styles.input}></TextInput>
            </View>
          </View>
          <View style={styles.img_container}>
            <Text style={styles.img_container_title}>코스 1</Text>
            <TouchableOpacity
              style={styles.imgchoose}
              onLaunchCamera={onLaunchCamera}
              onLaunchImageLibrary={onLaunchImageLibrary}
            >
              <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
            </TouchableOpacity>
          </View>
          <View style={styles.season}>
            <Text style={styles.season_title}>추천 계절</Text>
          </View>
          <Text>* 중복 선택 가능</Text>
        </View>
      </View>
    </View>
  );
}
