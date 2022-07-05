import { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, Dimensions, Modal, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { RadioButton, Title } from "react-native-paper";
import * as MediaLibrary from "expo-media-library";

import { styles } from "../../../assets/styles/add";

import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import TakePhoto from "../../component/TakePhoto";

export default function Ad({ route, navigation }) {
  const { item } = route.params;
  const [image, setImage] = useState({});

  const [value, setValue] = useState({
    wheelchair: "",
    stroller: "",
    babychair: "",
  });

  const getImage = (uri, name) => {
    setImage((image) => ({
      ...image,
      [name]: uri,
    }));
  };
  console.log(image);
  return (
    <ScrollView style={styles.scrollview}>
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
                  <RadioButton.Group
                    onValueChange={(text) =>
                      setValue((prev) => {
                        return { ...prev, wheelchair: text };
                      })
                    }
                    value={value.wheelchair}
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
                  <Text style={styles.add_subtitle}>유모차</Text>
                  <RadioButton.Group
                    onValueChange={(text) =>
                      setValue((prev) => {
                        return { ...prev, stroller: text };
                      })
                    }
                    value={value.stroller}
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
                  <Text style={styles.add_subtitle}>유아용 보조의자</Text>
                  <RadioButton.Group
                    onValueChange={(text) =>
                      setValue((prev) => {
                        return { ...prev, babychair: text };
                      })
                    }
                    value={value.babychair}
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
                  <TakePhoto title="휠체어" name="wheelchair" value={value.wheelchair} getImage={getImage} />
                  <TakePhoto title="유모차" name="stroller" value={value.stroller} getImage={getImage} />
                  <TakePhoto title="유아용 보조의자" name="babychair" value={value.babychair} getImage={getImage} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
