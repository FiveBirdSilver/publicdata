import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";
import RadioBtn from "../../component/RadioBtn";

export default function Guide({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const requiredValue = Object.keys(value).filter((i) => !i.includes("Img"));
  const Compare = ["e_g_guide_YN", "e_ep_visuallyImpairedProgram_YN", "e_g_audioGuide_YN", "e_g_videoGudie_YN"];
  const getCheck = (val, name) => {
    setValue((value) => ({
      ...value,
      [name]: val,
    }));
  };
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
  useEffect(() => {
    axios
      .post(`${API}/api/pohang/essential/getguide`, {
        team_skey: teamKey,
        list_skey: listKey,
      })
      .then((res) => {
        console.log(JSON.parse(res.data));
        setValue(JSON.parse(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnSubmit = async () => {
    if (requiredValue.length !== Compare.length) {
      Alert.alert("모든 항목을 입력해주세요.");
      return;
    } else
      uploadImgToGcs(image, regionKey).then((result) => {
        console.log("실행");
        axios
          .post(`${API}/api/pohang/essential/setguide`, {
            team_skey: teamKey,
            list_skey: listKey,
            e_g_guide_YN: value.e_g_guide_YN,
            e_g_signLanguage_YN: value.e_g_signLanguage_YN,
            e_g_audioGuide_YN: value.e_g_audioGuide_YN,
            e_g_videoGudie_YN: value.e_g_videoGudie_YN,
          })
          .then((res) => {
            const response = JSON.parse(res.data);
            if (response.result === 1) {
              Alert.alert("저장되었습니다.");
              navigation.goBack();
            } else Alert.alert("저장에 실패했습니다. 다시 시도해주세요.");
            navigation.goBack();
          })
          .catch((err) => {
            console.log(err);
            Alert.alert("저장에 실패했습니다. 다시 시도해주세요!!!");
            navigation.goBack();
          });
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
                <RadioBtn
                  title="안내요원(해설, 전담인력)"
                  getCheck={getCheck}
                  name="e_g_guide_YN"
                  value={value.e_g_guide_YN}
                  yes="있다"
                  no="없다"
                />
                <RadioBtn
                  title="수화 안내 유무"
                  getCheck={getCheck}
                  name="e_g_signLanguage_YN"
                  value={value.e_g_signLanguage_YN}
                />
                <RadioBtn
                  title="오디오 가이드"
                  getCheck={getCheck}
                  name="e_g_audioGuide_YN"
                  value={value.e_g_audioGuide_YN}
                />
                <RadioBtn
                  title="비디오 가이드"
                  getCheck={getCheck}
                  name="e_g_videoGudie_YN"
                  value={value.e_g_videoGudie_YN}
                />

                <View style={styles.img}>
                  {value.e_g_guide_YN === "Y" ? (
                    <TakePhoto
                      title="안내요원(해설, 전담인력)"
                      name="p_e_g_guideImg"
                      getImage={getImage}
                      value={value.guideImg}
                    />
                  ) : null}
                  {value.e_g_signLanguage_YN === "Y" ? (
                    <TakePhoto
                      title="수화 안내"
                      name="p_e_g_signLanguageImg"
                      getImage={getImage}
                      value={value.signLanguageImg}
                    />
                  ) : null}
                  {value.e_g_audioGuide_YN === "Y" ? (
                    <TakePhoto
                      title="오디오 가이드"
                      name="p_e_g_audioGuideImg"
                      getImage={getImage}
                      value={value.audioGuideImg}
                    />
                  ) : null}
                  {value.e_g_videoGudie_YN === "Y" ? (
                    <TakePhoto
                      title="비디오 가이드"
                      name="p_e_g_videoGuideImg"
                      getImage={getImage}
                      value={value.videoGuideImg}
                    />
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
