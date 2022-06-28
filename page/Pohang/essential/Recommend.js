import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";

export default function Recommend({ route, navigation }) {
  const { item } = route.params;

  const [cos, setCos] = useState("");
  const [season, setSeoson] = useState([]);

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
                <Text style={styles.add_subtitle}>추천코스</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="cos"
                    value={cos}
                    onChangeText={(text) => setCos(text.split(","))}
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.img}>
                {cos !== ""
                  ? cos.map((i) => (
                      <View style={styles.img_container}>
                        <Text style={styles.img_container_title} key={i}>
                          {i}
                        </Text>
                        <TouchableOpacity
                          style={styles.imgchoose}
                          onLaunchCamera={onLaunchCamera}
                          onLaunchImageLibrary={onLaunchImageLibrary}
                        >
                          <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                        </TouchableOpacity>
                      </View>
                    ))
                  : null}
              </View>
              <View style={styles.season}>
                <Text style={styles.season_title}>추천 계절</Text>
              </View>
              <Text style={styles.season_ps}>* 중복 선택 가능</Text>
              <View style={styles.season_container}>
                <BouncyCheckbox
                  size={15}
                  fillColor="#00acb1"
                  onPress={(v) =>
                    v
                      ? setSeoson((prev) => {
                          return [...prev, 0];
                        })
                      : setSeoson((prev) => {
                          return prev.filter((i) => i !== 0);
                        })
                  }
                  text="봄"
                  iconStyle={{ borderRadius: 30 }}
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                />
                <BouncyCheckbox
                  size={15}
                  fillColor="#00acb1"
                  onPress={(v) =>
                    v
                      ? setSeoson((prev) => {
                          return [...prev, 1];
                        })
                      : setSeoson((prev) => {
                          return prev.filter((i) => i !== 1);
                        })
                  }
                  text="여름"
                  iconStyle={{ borderRadius: 30 }}
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                />
                <BouncyCheckbox
                  size={15}
                  fillColor="#00acb1"
                  onPress={(v) =>
                    v
                      ? setSeoson((prev) => {
                          return [...prev, 2];
                        })
                      : setSeoson((prev) => {
                          return prev.filter((i) => i !== 2);
                        })
                  }
                  text="가을"
                  iconStyle={{ borderRadius: 30 }}
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                />
                <BouncyCheckbox
                  size={15}
                  fillColor="#00acb1"
                  onPress={(v) =>
                    v
                      ? setSeoson((prev) => {
                          return [...prev, 3];
                        })
                      : setSeoson((prev) => {
                          return prev.filter((i) => i !== 3);
                        })
                  }
                  text="겨울"
                  iconStyle={{ borderRadius: 30 }}
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
