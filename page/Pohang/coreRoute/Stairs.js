import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { styles } from "../../../assets/styles/add";
import Section from "../../component/Section";

export default function Staris({ route, navigation }) {
  const { item } = route.params;

  const [stairs, setStairs] = useState("");
  const [handle, setHandle] = useState("");
  const [handleBraille, setHandleBraille] = useState("");
  const [dotBlock, setDotBlock] = useState("");

  const [count, setCount] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [handleStructure, setHandleStructure] = useState("");

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
                <Text style={styles.add_subtitle}>계단 유무</Text>
                <RadioButton.Group onValueChange={(v) => setStairs(v)} value={stairs} style={styles.yesorno}>
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
                <Text style={styles.add_subtitle}>계단 손잡이 유무</Text>
                <RadioButton.Group onValueChange={(v) => setHandle(v)} value={handle} style={styles.yesorno}>
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="Y" disabled={stairs === "N" || stairs === "" ? true : false} />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" disabled={stairs === "N" || stairs === "" ? true : false} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>계단 손잡이 점자 유무(시작과 끝)</Text>
                <RadioButton.Group
                  onValueChange={(v) => setHandleBraille(v)}
                  value={handleBraille}
                  style={styles.yesorno}
                >
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="Y" disabled={stairs === "N" || stairs === "" ? true : false} />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" disabled={stairs === "N" || stairs === "" ? true : false} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>계단 상하부 점형 블록 설치 유무</Text>
                <RadioButton.Group onValueChange={(v) => setDotBlock(v)} value={dotBlock} style={styles.yesorno}>
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="Y" disabled={stairs === "N" || stairs === "" ? true : false} />
                    </View>
                    <View style={styles.radio_wrap}>
                      <RadioButton value="N" disabled={stairs === "N" || stairs === "" ? true : false} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.img}>
                {stairs === "Y" ? (
                  <>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>계단 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>계단 손잡이 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>계단 손잡이 점자 유무(시작과 끝)</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.img_container}>
                      <Text style={styles.img_container_title}>계단 상하부 점형 블록 설치 유무</Text>
                      <TouchableOpacity
                        style={styles.imgchoose}
                        onLaunchCamera={onLaunchCamera}
                        onLaunchImageLibrary={onLaunchImageLibrary}
                      >
                        <AntDesign style={styles.icon} color="white" name="pluscircle" size={40} />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}
              </View>
              <View>
                {stairs === "Y" ? (
                  <View style={styles.add_input}>
                    <View style={styles.add_container}>
                      <Text style={styles.add_subtitle}>계단 개수</Text>
                      <View style={styles.input_wrapper}>
                        <TextInput
                          name="count"
                          value={count}
                          onChangeText={(text) => setCount(text)}
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>
                    <View style={styles.add_container}>
                      <Text style={styles.add_subtitle}>계단 폭</Text>
                      <View style={styles.input_wrapper}>
                        <TextInput
                          name="width"
                          value={width}
                          onChangeText={(text) => setWidth(text)}
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>
                    <View style={styles.add_container}>
                      <Text style={styles.add_subtitle}>계단 높이</Text>
                      <View style={styles.input_wrapper}>
                        <TextInput
                          name="height"
                          value={height}
                          onChangeText={(text) => setHeight(text)}
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>
                    <View style={styles.add_container}>
                      <Text style={{ marginTop: 10 }}>계단 손잡이 형태(양, 옆, 한쪽)</Text>
                      <View style={{ width: "100%" }}>
                        <TextInput
                          name="handleStructure"
                          value={handleStructure}
                          onChangeText={(text) => setHandleStructure(text)}
                          style={styles.input}
                        ></TextInput>
                      </View>
                    </View>
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
