import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Roadchin({ route, navigation }) {
  const { item } = route.params;

  const [roadchin, setRoadchin] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

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
                <Text style={styles.add_subtitle}>턱 유무</Text>
                <RadioButton.Group onValueChange={(v) => setRoadchin(v)} value={roadchin} style={styles.yesorno}>
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
                <Text style={styles.add_subtitle}>높이</Text>
                <RadioButton.Group onValueChange={(v) => setHeight(v)} value={height} style={styles.yesorno}>
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="Y" disabled={roadchin === "N" ? true : false} />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" disabled={roadchin === "N" ? true : false} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>폭</Text>
                <RadioButton.Group onValueChange={(v) => setWidth(v)} value={width} style={styles.yesorno}>
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="Y" disabled={roadchin === "N" ? true : false} />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" disabled={roadchin === "N" ? true : false} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
