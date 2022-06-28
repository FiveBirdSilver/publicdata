import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Leaflet({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    leaflet: "",
    disabledFacility: "",
    dotLeaflet: "",
  });
  console.log(value);
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
                <Text style={styles.add_subtitle}>관광지 리플렛 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, leaflet: v };
                    })
                  }
                  value={value.leaflet}
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
                <Text style={styles.add_subtitle}>관광지 리플렛 장애인 편의시설 정보 제공 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, disabledFacility: v };
                    })
                  }
                  value={value.disabledFacility}
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
                <Text style={styles.add_subtitle}>점자 관광지 안내서 제공 유무</Text>
                <RadioButton.Group
                  onValueChange={(v) =>
                    setValue((prev) => {
                      return { ...prev, dotLeaflet: v };
                    })
                  }
                  value={value.dotLeaflet}
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
                {value.leaflet === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>관광지 리플렛 유무</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.disabledFacility === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>관광지 리플렛 장애인 편의시설 정보 제공 유무</Text>
                    <TouchableOpacity
                      style={styles.imgchoose}
                      onLaunchCamera={onLaunchCamera}
                      onLaunchImageLibrary={onLaunchImageLibrary}
                    >
                      <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                {value.dotLeaflet === "Y" ? (
                  <View style={styles.img_container}>
                    <Text style={styles.img_container_title}>점자 관광지 안내서 제공 유무</Text>
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
