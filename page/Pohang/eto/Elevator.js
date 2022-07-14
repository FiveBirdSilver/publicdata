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
export default function Elevator({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState([]);
  const yLength = Object.values(value).filter((i) => i === "Y").length;

  const getCheck = (val, name) => {
    console.log(name);
    if (name === "eto_ev_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        eto_ev_YN: "N",
        eto_ev_door_width: 0,
        eto_ev_wheelchair_possible_YN: "N",
        eto_ev_button_braille_YN: "N",
        eto_ev_emergencybell_YN: "N",
      }));
    } else
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
      .post(`${API}/api/pohang/eto/getelevator`, {
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

  const getText = (text, name) => {
    setValue((value) => ({
      ...value,
      [name]: text,
    }));
  };

  const DataSave = () => {
    setModalVisible(true);
    uploadImgToGcs(image, regionKey, region, listKey, dataCollection, data)
      .then((result) => {
        console.log("실행");
        axios
          .post(`${API}/api/pohang/eto/setelevator`, {
            team_skey: teamKey,
            list_skey: listKey,
            eto_ev_YN: value.eto_ev_YN,
            eto_ev_door_width: value.eto_ev_door_width,
            eto_ev_wheelchair_possible_YN: value.eto_ev_wheelchair_possible_YN,
            eto_ev_button_braille_YN: value.eto_ev_button_braille_YN,
            eto_ev_emergencybell_YN: value.eto_ev_emergencybell_YN,
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
    if (value.eto_ev_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.eto_ev_YN === "Y" && value.eto_ev_door_width === (null || "" || 0)) ||
      (value.eto_ev_YN === "Y" && value.eto_ev_wheelchair_possible_YN === null) ||
      (value.eto_ev_YN === "Y" && value.eto_ev_button_braille_YN === null) ||
      (value.eto_ev_YN === "Y" && value.eto_ev_emergencybell_YN === null)
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (value.eto_ev_YN === "Y" && imageLength !== 4) {
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
                title="승강기 유무"
                getCheck={getCheck}
                name="eto_ev_YN"
                value={value.eto_ev_YN}
                yes="있다"
                no="없다"
              />

              {value.eto_ev_YN === "Y" ? (
                <>
                  <RadioBtn
                    title="휠체어 탑승 가능 유무"
                    getCheck={getCheck}
                    name="eto_ev_wheelchair_possible_YN"
                    value={value.eto_ev_wheelchair_possible_YN}
                  />
                  <RadioBtn
                    title="조작버튼 점자표시 유무"
                    getCheck={getCheck}
                    name="eto_ev_button_braille_YN"
                    value={value.eto_ev_button_braille_YN}
                  />
                  <RadioBtn
                    title="비상벨 유무"
                    getCheck={getCheck}
                    name="eto_ev_emergencybell_YN"
                    value={value.eto_ev_emergencybell_YN}
                  />
                </>
              ) : null}

              <View style={styles.img}>
                {value.eto_ev_YN === "Y" ? (
                  <>
                    <TakePhoto
                      title="승강기"
                      name="p_cr_ev_elevatorImg"
                      getImage={getImage}
                      value={value.p_cr_ev_elevatorImg}
                    />
                    <TakePhoto
                      title="휠체어 탑승 가능"
                      name="p_cr_ev_wheelchairImg"
                      getImage={getImage}
                      value={value.p_cr_ev_wheelchairImg}
                    />
                    <TakePhoto
                      title="조작버튼 점자표시"
                      name="p_cr_ev_braileImg"
                      getImage={getImage}
                      value={value.p_cr_ev_braileImg}
                    />
                    <TakePhoto
                      title="비상벨"
                      name="p_cr_ev_emergencybellImg"
                      getImage={getImage}
                      value={value.p_cr_ev_emergencybellImg}
                    />
                  </>
                ) : null}
              </View>
              <View>
                {value.eto_ev_YN === "Y" ? (
                  <View
                    style={{
                      position: "relative",
                    }}
                  >
                    <Input
                      title="승강기 문 폭"
                      getText={getText}
                      name="eto_ev_door_width"
                      value={value.eto_ev_door_width}
                      keyboardType={"numeric"}
                    />
                    <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>
                  </View>
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
