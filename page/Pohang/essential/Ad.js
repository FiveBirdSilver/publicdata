import { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, Dimensions, Modal, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import TakePhoto from "../../component/TakePhoto";

import uploadImgToGcs from "../../component/util";

export default function Ad({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data } = route.params;
  // regionKey ==> 대구/포항 구분 키 ex) 3002

  const [value, setValue] = useState({
    wheelchair: "",
    stroller: "",
    babychair: "",
  });

  const [image, setImage] = useState([]);

  const getImage = (uri, name) => {
    const newArr = [...image];
    let resultArr = [];
    if (newArr.findIndex((v) => v.name === name) !== -1) {
      resultArr = newArr.filter((v) => v.name !== name);
      // console.log("=================삭제");
      // console.log(resultArr);
      setImage(resultArr);
    } else {
      newArr.push({
        name: name,
        img: uri,
        depth1: region,
        depth2: listKey,
        depth3: dataCollection,
        depth4: data,
      });
      // console.log("=================추가");
      // console.log(newArr);
      setImage(newArr);
    }
  };

  const handleOnSubmit = async () => {
    uploadImgToGcs(image, regionKey)
      .then((result) => {
        console.log("실행");
        // 이 자리에 DB API 호출
      })
      .catch((err) => {
        console.log("에러발생");
      });
  };

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
          <Text style={styles.add_title}>{listName}</Text>

          <View style={styles.add_title_wrapper}>
            <View style={styles.icon_wrap}>
              <TouchableOpacity style={styles.footer_title} onPress={() => handleOnSubmit()}>
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
                  {value.wheelchair === "Y" ? (
                    <TakePhoto title="휠체어" name="p_e_ad_wheelchairImg" getImage={getImage} />
                  ) : null}
                  {value.stroller === "Y" ? (
                    <TakePhoto title="유모차" name="p_e_ad_strollerImg" getImage={getImage} />
                  ) : null}
                  {value.babychair === "Y" ? (
                    <TakePhoto title="유아용 보조의자" name="p_e_ad_babychairImg" getImage={getImage} />
                  ) : null}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
