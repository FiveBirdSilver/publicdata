import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";
import RadioBtn from "../../component/RadioBtn";

export default function Facility({ route, navigation }) {
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
      .post(`${API}/api/pohang/essential/getfacility`, {
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

  const handleOnSubmit = async () => {
    if (
      value.e_af_cartService_YN === null ||
      value.e_af_wheelchairLift_YN === null ||
      value.e_af_restPossible_YN === null
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (yLength !== imageLength) {
      Alert.alert("필수 사진을 모두 추가해 주세요.");
    } else {
      setModalVisible(true);
      uploadImgToGcs(image, regionKey, region, listKey, dataCollection, data).then((result) => {
        console.log("실행");
        axios
          .post(`${API}/api/pohang/essential/setfacility`, {
            team_skey: teamKey,
            list_skey: listKey,
            e_af_cartService_YN: value.e_af_cartService_YN,
            e_af_wheelchairLift_YN: value.e_af_wheelchairLift_YN,
            e_af_restPossible_YN: value.e_af_restPossible_YN,
          })
          .then((res) => {
            const response = JSON.parse(res.data);
            if (response.result === 1) {
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
                title="이동 카트 서비스 제공"
                getCheck={getCheck}
                name="e_af_cartService_YN"
                value={value.e_af_cartService_YN}
                yes="있다"
                no="없다"
              />
              <RadioBtn
                title="휠체어 승하차용 리프트"
                getCheck={getCheck}
                name="e_af_wheelchairLift_YN"
                value={value.e_af_wheelchairLift_YN}
              />

              <RadioBtn
                title="장애인 동반 휴식 가능 시설"
                getCheck={getCheck}
                name="e_af_restPossible_YN"
                value={value.e_af_restPossible_YN}
              />

              <View style={styles.img}>
                {value.e_af_cartService_YN === "Y" ? (
                  <TakePhoto
                    title="이동 카트 서비스 제공"
                    name="p_e_af_cartServiceImg"
                    getImage={getImage}
                    value={value.p_e_af_cartServiceImg}
                  />
                ) : null}
                {value.e_af_wheelchairLift_YN === "Y" ? (
                  <TakePhoto
                    title="휠체어 승하차용 리프트"
                    name="p_e_af_wheelchairLiftImg"
                    getImage={getImage}
                    value={value.p_e_af_wheelchairLiftImg}
                  />
                ) : null}
                {value.e_af_restPossible_YN === "Y" ? (
                  <TakePhoto
                    title="장애인 동반 휴식 가능 시설"
                    name="p_e_af_restPossibleImg"
                    getImage={getImage}
                    value={value.p_e_af_restPossibleImg}
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
