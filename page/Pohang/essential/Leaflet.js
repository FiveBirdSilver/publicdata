import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";
import RadioBtn from "../../component/RadioBtn";

export default function Leaflet({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const requiredValue = Object.keys(value).filter((i) => !i.includes("Img"));
  const Compare = ["e_tl_YN", "e_tl_disabled_facility_YN", "e_tl_dot_leaflet_YN"];
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
      .post(`${API}/api/pohang/essential/getleaflet`, {
        team_skey: teamKey,
        list_skey: listKey,
      })
      .then((res) => {
        console.log("+++++++", JSON.parse(res.data));
        setValue(JSON.parse(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnSubmit = async () => {
    if (requiredValue.length !== Compare.length) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else {
      setModalVisible(true);
      uploadImgToGcs(image, regionKey)
        .then((result) => {
          console.log("실행");
          axios
            .post(`${API}/api/pohang/essential/setleaflet`, {
              team_skey: teamKey,
              list_skey: listKey,
              e_tl_YN: value.e_tl_YN,
              e_tl_disabled_facility_YN: value.e_tl_disabled_facility_YN,
              e_tl_dot_leaflet_YN: value.e_tl_dot_leaflet_YN,
            })
            .then((res) => {
              const response = JSON.parse(res.data);
              if (response.result === 1) {
                console.log("실행2");
                setModalVisible(false);
                Alert.alert("저장되었습니다.");
                navigation.goBack();
              } else {
                setModalVisible(false);
                Alert.alert("저장에 실패했습니다. 다시 시도해주세요.");
                navigation.goBack();
              }
            })
            .catch((err) => {
              console.log(err);
              setModalVisible(false);
              Alert.alert("저장에 실패했습니다. 다시 시도해주세요.");
              navigation.goBack();
            });
        })
        .catch((err) => {
          console.log("에러발생");
        });
    }
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
            <View style={styles.add_wrapper}>
              <RadioBtn
                title="관광지 리플렛 유무"
                getCheck={getCheck}
                name="e_tl_YN"
                value={value.e_tl_YN}
                yes="있다"
                no="없다"
              />
              <RadioBtn
                title="관광지 리플렛 장애인 편의시설 정보 제공 유무"
                getCheck={getCheck}
                name="e_tl_disabled_facility_YN"
                value={value.e_tl_disabled_facility_YN}
              />
              <RadioBtn
                title="점자 관광지 안내서 제공 유무"
                getCheck={getCheck}
                name="e_tl_dot_leaflet_YN"
                value={value.e_tl_dot_leaflet_YN}
              />

              <View style={styles.img}>
                {value.e_tl_YN === "Y" ? (
                  <TakePhoto
                    title="관광지 리플렛"
                    name="p_e_tl_leafletImg"
                    getImage={getImage}
                    value={value.leafletImg}
                  />
                ) : null}
                {value.e_tl_disabled_facility_YN === "Y" ? (
                  <TakePhoto
                    title="관광지 리플렛 장애인 편의시설 정보 제공"
                    name="p_e_tl_disabledFacilityImg"
                    getImage={getImage}
                    value={value.disabledFacilityImg}
                  />
                ) : null}
                {value.e_tl_dot_leaflet_YN === "Y" ? (
                  <TakePhoto
                    title="점자 관광지 안내서 제공"
                    name="p_e_tl_dotLeafletImg"
                    getImage={getImage}
                    value={value.dotLeafletImg}
                  />
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.modal, styles.horizontal]}>
          <ActivityIndicator size="large" color={color.blue} />
        </View>
      </Modal>
    </ScrollView>
  );
}
