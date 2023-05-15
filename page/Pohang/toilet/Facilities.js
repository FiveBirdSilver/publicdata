import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import Input from "../../component/Input";

import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";
import RadioBtn from "../../component/RadioBtn";
export default function Facilities({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState([]);
  const yLength = Object.values(value).filter((i) => i === "Y").length;
  const getCheck = (val, name) => {
    setValue((value) => ({
      ...value,
      [name]: val,
    }));
  };

  const getImage = (uri, name) => {
    const newArr = [...image];
    let tmp = [...image];

    if (newArr.findIndex((v) => v.name === name) !== -1) {
      tmp.forEach((v) => {
        if (v.name === name) {
          v.url = uri;
        }
      });
    } else {
      tmp.push({
        name: name,
        url: uri,
      });
    }

    setImage(tmp);
    if (uri !== "") {
      setImageLength(imageLength + 1);
    } else if (uri === "") {
      setImageLength(imageLength - 1);
    }
  };

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/toilet/getfacilities`, {
        team_skey: teamKey,
        list_skey: listKey,
      })
      .then((res) => {
        const response = JSON.parse(res.data);
        let obj = response;

        response.picture.forEach((v) => {
          obj[v.name] = v.url;
        });

        setValue(obj);
        setImageLength(
          response.picture
            .map((i) => i.url)
            .filter((v) => v !== "")
            .filter((o) => o !== null).length
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const DataSave = () => {
    setModalVisible(true);
    uploadImgToGcs(image, regionKey, region, listKey, dataCollection, data)
      .then((result) => {
        axios
          .post(`${API}/api/pohang/toilet/setfacilities`, {
            team_skey: teamKey,
            list_skey: listKey,
            t_fc_infant_cradle_YN: value.t_fc_infant_cradle_YN,
            t_fc_diaper_changing_table_YN: value.t_fc_diaper_changing_table_YN,
            t_fc_Infant_urinal_YN: value.t_fc_Infant_urinal_YN,
            t_fc_Infant_toilet_YN: value.t_fc_Infant_toilet_YN,
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
        setModalVisible(false);
      });
  };
  const handleOnSubmit = async () => {
    if (
      value.t_fc_infant_cradle_YN === null ||
      value.t_fc_diaper_changing_table_YN === null ||
      value.t_fc_Infant_urinal_YN === null ||
      value.t_fc_Infant_toilet_YN === null
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (yLength !== imageLength) {
      Alert.alert("필수 사진을 모두 추가해 주세요.");
    } else DataSave();
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
                title="영유아 거치대"
                getCheck={getCheck}
                name="t_fc_infant_cradle_YN"
                value={value.t_fc_infant_cradle_YN}
                yes="있다"
                no="없다"
              />
              <RadioBtn
                title="기저귀 교환대"
                getCheck={getCheck}
                name="t_fc_diaper_changing_table_YN"
                value={value.t_fc_diaper_changing_table_YN}
              />
              <RadioBtn
                title="소아 소변기"
                getCheck={getCheck}
                name="t_fc_Infant_urinal_YN"
                value={value.t_fc_Infant_urinal_YN}
              />
              <RadioBtn
                title="소아 대변기"
                getCheck={getCheck}
                name="t_fc_Infant_toilet_YN"
                value={value.t_fc_Infant_toilet_YN}
              />
              <View style={styles.img}>
                {value.t_fc_infant_cradle_YN === "Y" ? (
                  <TakePhoto
                    title="영유아 거치대"
                    name="p_t_fc_infantcradleImg"
                    getImage={getImage}
                    value={value.p_t_fc_infantcradleImg}
                  />
                ) : null}
                {value.t_fc_diaper_changing_table_YN === "Y" ? (
                  <TakePhoto
                    title="기저귀 교환대"
                    name="p_t_fc_diaperchangTabelImg"
                    getImage={getImage}
                    value={value.p_t_fc_diaperchangTabelImg}
                  />
                ) : null}
                {value.t_fc_Infant_urinal_YN === "Y" ? (
                  <TakePhoto
                    title="소아 소변기"
                    name="p_t_fc_urinalImg"
                    getImage={getImage}
                    value={value.p_t_fc_urinalImg}
                  />
                ) : null}
                {value.t_fc_Infant_toilet_YN === "Y" ? (
                  <TakePhoto
                    title="소아 대변기"
                    name="p_t_fc_toiletImg"
                    getImage={getImage}
                    value={value.p_t_fc_toiletImg}
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
