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
export default function Urinal({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState([]);

  const getCheck = (val, name) => {
    if (name === "t_toilet_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        t_toilet_YN: "N",
        t_toilet_count: 0,
        t_toilet_handle_YN: "N",
        t_toilet_automatic_sensor_YN: "N",
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
      .post(`${API}/api/pohang/toilet/gettoilet`, {
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
          .post(`${API}/api/pohang/toilet/settoilet`, {
            team_skey: teamKey,
            list_skey: listKey,
            t_toilet_YN: value.t_toilet_YN,
            t_toilet_count: value.t_toilet_count,
            t_toilet_handle_YN: value.t_toilet_handle_YN,
            t_toilet_automatic_sensor_YN: value.t_toilet_automatic_sensor_YN,
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
    if (value.t_toilet_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.t_toilet_YN === "Y" && value.t_toilet_count === null) ||
      (value.t_toilet_YN === "Y" && value.t_toilet_count === "") ||
      (value.t_toilet_YN === "Y" && value.t_toilet_count === 0) ||
      (value.t_toilet_YN === "Y" && value.t_toilet_handle_YN === null) ||
      (value.t_toilet_YN === "Y" && value.t_toilet_automatic_sensor_YN === null)
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (value.t_toilet_YN === "Y" && imageLength !== 3) {
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
                title="대변기 유무"
                getCheck={getCheck}
                name="t_toilet_YN"
                value={value.t_toilet_YN}
                yes="있다"
                no="없다"
              />
              {value.t_toilet_YN === "Y" ? (
                <>
                  <View
                    style={{
                      position: "relative",
                    }}
                  >
                    <Input
                      title="대변기 개수"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_toilet_count"
                      value={value.t_toilet_count}
                    />
                    <Text style={{ position: "absolute", top: 13, right: 10 }}>개</Text>
                  </View>
                  <RadioBtn
                    title="대변기 좌우 손잡이 설치 여부"
                    getCheck={getCheck}
                    name="t_toilet_handle_YN"
                    value={value.t_toilet_handle_YN}
                  />
                  <RadioBtn
                    title="버튼식/자동센서 물 내림 여부"
                    getCheck={getCheck}
                    name="t_toilet_automatic_sensor_YN"
                    value={value.t_toilet_automatic_sensor_YN}
                  />
                </>
              ) : null}

              <View style={styles.img}>
                {value.t_toilet_YN === "Y" ? (
                  <>
                    <TakePhoto
                      title="대변기"
                      name="p_t_t_toiletImg"
                      getImage={getImage}
                      value={value.p_t_t_toiletImg}
                    />
                    <TakePhoto
                      title="대변기 좌우 손잡이"
                      name="p_t_t_uninalhandleImg"
                      getImage={getImage}
                      value={value.p_t_t_uninalhandleImg}
                    />
                    <TakePhoto
                      title="버튼식/자동센서"
                      name="p_t_t_automaticsensorImg"
                      getImage={getImage}
                      value={value.p_t_t_automaticsensorImg}
                    />
                  </>
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
