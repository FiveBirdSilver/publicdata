import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";
import RadioBtn from "../../component/RadioBtn";

export default function Program({ route, navigation }) {
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
      .post(`${API}/api/pohang/essential/getprogram`, {
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
      value.e_ep_wheelchairProgram_YN === null ||
      value.e_ep_visuallyImpairedProgram_YN === null ||
      value.e_ep_deafProgram_YN === null ||
      value.e_ep_developmentallyDisabledProgram_YN === null ||
      value.e_ep_seniorProgram_YN === null ||
      value.e_ep_infantProgram_YN === null
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (yLength !== imageLength) {
      Alert.alert("필수 사진을 모두 추가해 주세요.");
    } else {
      setModalVisible(true);
      uploadImgToGcs(image, regionKey, region, listKey, dataCollection, data).then((result) => {
        console.log("실행");
        axios
          .post(`${API}/api/pohang/essential/setprogram`, {
            team_skey: teamKey,
            list_skey: listKey,
            e_ep_wheelchairProgram_YN: value.e_ep_wheelchairProgram_YN,
            e_ep_visuallyImpairedProgram_YN: value.e_ep_visuallyImpairedProgram_YN,
            e_ep_deafProgram_YN: value.e_ep_deafProgram_YN,
            e_ep_developmentallyDisabledProgram_YN: value.e_ep_developmentallyDisabledProgram_YN,
            e_ep_seniorProgram_YN: value.e_ep_seniorProgram_YN,
            e_ep_infantProgram_YN: value.e_ep_infantProgram_YN,
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
                title="휠체어 이용자 체험 프로그램"
                getCheck={getCheck}
                name="e_ep_wheelchairProgram_YN"
                value={value.e_ep_wheelchairProgram_YN}
                yes="있다"
                no="없다"
              />
              <RadioBtn
                title="시각장애인 체험 프로그램"
                getCheck={getCheck}
                name="e_ep_visuallyImpairedProgram_YN"
                value={value.e_ep_visuallyImpairedProgram_YN}
              />
              <RadioBtn
                title="청각장애인 체험 프로그램 체험 프로그램"
                getCheck={getCheck}
                name="e_ep_deafProgram_YN"
                value={value.e_ep_deafProgram_YN}
              />
              <RadioBtn
                title="발달장애인 체험 프로그램"
                getCheck={getCheck}
                name="e_ep_developmentallyDisabledProgram_YN"
                value={value.e_ep_developmentallyDisabledProgram_YN}
              />
              <RadioBtn
                title="시니어 체험 프로그램"
                getCheck={getCheck}
                name="e_ep_seniorProgram_YN"
                value={value.e_ep_seniorProgram_YN}
              />
              <RadioBtn
                title="영유아 체험 프로그램"
                getCheck={getCheck}
                name="e_ep_infantProgram_YN"
                value={value.e_ep_infantProgram_YN}
              />
              <View style={styles.img}>
                {value.e_ep_wheelchairProgram_YN === "Y" ? (
                  <TakePhoto
                    title="휠체어 이용자 체험 프로그램"
                    name="p_e_ep_wheelchairImg"
                    getImage={getImage}
                    value={value.p_e_ep_wheelchairImg}
                  />
                ) : null}
                {value.e_ep_visuallyImpairedProgram_YN === "Y" ? (
                  <TakePhoto
                    title="시각장애인 체험 프로그램"
                    name="p_e_ep_visuallyImpairedImg"
                    getImage={getImage}
                    value={value.p_e_ep_visuallyImpairedImg}
                  />
                ) : null}
                {value.e_ep_deafProgram_YN === "Y" ? (
                  <TakePhoto
                    title="청각장애인 체험 프로그램 체험 프로그램"
                    name="p_e_ep_deafImg"
                    getImage={getImage}
                    value={value.p_e_ep_deafImg}
                  />
                ) : null}
                {value.e_ep_developmentallyDisabledProgram_YN === "Y" ? (
                  <TakePhoto
                    title="발달장애인 체험 프로그램"
                    name="p_e_ep_devdisabledImg"
                    getImage={getImage}
                    value={value.p_e_ep_devdisabledImg}
                  />
                ) : null}
                {value.e_ep_seniorProgram_YN === "Y" ? (
                  <TakePhoto
                    title="시니어 체험 프로그램"
                    name="p_e_ep_seniorImg"
                    getImage={getImage}
                    value={value.p_e_ep_seniorImg}
                  />
                ) : null}
                {value.e_ep_infantProgram_YN === "Y" ? (
                  <TakePhoto
                    title="영유아 체험 프로그램"
                    name="p_e_ep_infantImg"
                    getImage={getImage}
                    value={value.p_e_ep_infantImg}
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
