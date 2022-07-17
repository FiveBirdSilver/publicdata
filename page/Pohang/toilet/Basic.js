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

export default function Basic({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState([]);
  const yLength = Object.values(value).filter((i) => i === "Y").length;
  console.log("test");
  const getCheck = (val, name) => {
    if (name === "t_b_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        t_b_YN: "N",
        t_b_genderDivision_YN: "N",
        t_b_genderDivisionSign_YN: "N",
        t_b_dotblock_YN: "N",
        t_b_usesign_YN: "N",
        t_b_emergencybell_YN: "N",
        t_b_name: "",
        t_b_address: "",
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
      .post(`${API}/api/pohang/toilet/getbasic`, {
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
        axios
          .post(`${API}/api/pohang/toilet/setbasic`, {
            team_skey: teamKey,
            list_skey: listKey,
            t_b_YN: value.t_b_YN,
            t_b_genderDivision_YN: value.t_b_genderDivision_YN,
            t_b_genderDivisionSign_YN: value.t_b_genderDivisionSign_YN,
            t_b_dotblock_YN: value.t_b_dotblock_YN,
            t_b_usesign_YN: value.t_b_usesign_YN,
            t_b_emergencybell_YN: value.t_b_emergencybell_YN,
            t_b_name: value.t_b_name,
            t_b_address: value.t_b_address,
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
    if (value.t_b_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.t_b_YN === "Y" && value.t_b_genderDivision_YN === null) ||
      (value.t_b_YN === "Y" && value.t_b_genderDivisionSign_YN === null) ||
      (value.t_b_YN === "Y" && value.t_b_dotblock_YN === null) ||
      (value.t_b_YN === "Y" && value.t_b_usesign_YN === null) ||
      (value.t_b_YN === "Y" && value.t_b_emergencybell_YN === null) ||
      (value.t_b_YN === "Y" && value.t_b_name === null) ||
      (value.t_b_YN === "Y" && value.t_b_name === "") ||
      (value.t_b_YN === "Y" && value.t_b_address === null) ||
      (value.t_b_YN === "Y" && value.t_b_address === "")
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      value.t_b_YN === "Y" &&
      value.t_b_usesign_YN === "N" &&
      value.t_b_emergencybell_YN === "N" &&
      imageLength !== 4
    ) {
      Alert.alert("필수 사진을 모두 추가해 주세요.");
    } else if (
      value.t_b_YN === "Y" &&
      value.t_b_usesign_YN === "Y" &&
      value.t_b_emergencybell_YN === "N" &&
      imageLength !== 5
    ) {
      Alert.alert("필수 사진을 모두 추가해 주세요.");
    } else if (
      value.t_b_YN === "Y" &&
      value.t_b_usesign_YN === "N" &&
      value.t_b_emergencybell_YN === "Y" &&
      imageLength !== 5
    ) {
      Alert.alert("필수 사진을 모두 추가해 주세요.");
    } else if (
      value.t_b_YN === "Y" &&
      value.t_b_usesign_YN === "Y" &&
      value.t_b_emergencybell_YN === "Y" &&
      imageLength !== 6
    ) {
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
                title="화장실 유무"
                getCheck={getCheck}
                name="t_b_YN"
                value={value.t_b_YN}
                yes="있다"
                no="없다"
              />

              {value.t_b_YN === "Y" ? (
                <>
                  <RadioBtn
                    title="남녀별도 사용 가능 유무"
                    getCheck={getCheck}
                    name="t_b_genderDivision_YN"
                    value={value.t_b_genderDivision_YN}
                  />
                  <RadioBtn
                    title="출입구 남/녀 구분 점자표지판 설치 유무"
                    getCheck={getCheck}
                    name="t_b_genderDivisionSign_YN"
                    value={value.t_b_genderDivisionSign_YN}
                  />
                  <RadioBtn
                    title="출입구 전면 바닥 점형 블록 설치 유무"
                    getCheck={getCheck}
                    name="t_b_dotblock_YN"
                    value={value.t_b_dotblock_YN}
                  />
                  <RadioBtn
                    title="화장실 사용 여부 외부 표시 확인 기능 유무"
                    getCheck={getCheck}
                    name="t_b_usesign_YN"
                    value={value.t_b_usesign_YN}
                  />
                  <RadioBtn
                    title="비상벨 설치 유무"
                    getCheck={getCheck}
                    name="t_b_emergencybell_YN"
                    value={value.t_b_emergencybell_YN}
                  />
                </>
              ) : null}

              <View style={styles.img}>
                {value.t_b_YN === "Y" ? (
                  <>
                    <TakePhoto
                      title="화장실"
                      name="p_t_b_toiletImg"
                      getImage={getImage}
                      value={value.p_t_b_toiletImg}
                    />
                    <TakePhoto
                      title="남녀별도 사용 가능"
                      name="p_t_b_genderDivImg"
                      getImage={getImage}
                      value={value.p_t_b_genderDivImg}
                    />
                    <TakePhoto
                      title="출입구 남/녀 구분 점자표지판 설치"
                      name="p_t_b_genderDivSignImg"
                      getImage={getImage}
                      value={value.p_t_b_genderDivSignImg}
                    />
                    <TakePhoto
                      title="출입구 전면 바닥 점형 블록 설치"
                      name="p_t_b_dotblockImg"
                      getImage={getImage}
                      value={value.p_t_b_dotblockImg}
                    />
                    {value.t_b_usesign_YN === "Y" ? (
                      <TakePhoto
                        title="화장실 사용 여부 외부 표시 확인 기능"
                        name="p_t_b_useSignImg"
                        getImage={getImage}
                        value={value.p_t_b_useSignImg}
                      />
                    ) : null}
                    {value.t_b_emergencybell_YN === "Y" ? (
                      <TakePhoto
                        title="비상벨 설치"
                        name="p_t_b_emergencybellImg"
                        getImage={getImage}
                        value={value.p_t_b_emergencybellImg}
                      />
                    ) : null}
                  </>
                ) : null}
              </View>
              {value.t_b_YN === "Y" ? (
                <>
                  <Input title="화장실 이름" getText={getText} name="t_b_name" value={value.t_b_name} />
                  <Input title="화장실 주소" getText={getText} name="t_b_address" value={value.t_b_address} />
                </>
              ) : null}
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
