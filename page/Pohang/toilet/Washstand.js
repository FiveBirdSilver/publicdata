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

export default function Washstand({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getCheck = (val, name) => {
    if (name === "t_w_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        t_w_YN: "N",
        t_w_height: 0,
        t_w_handle_YN: "N",
        t_w_temperature_braille_YN: "N",
        t_w_child_washstand_YN: "N",
        t_w_wheelchair_possible_YN: "N",
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
  };

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/toilet/getwashstand`, {
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
          .post(`${API}/api/pohang/toilet/setwashstand`, {
            team_skey: teamKey,
            list_skey: listKey,
            t_w_YN: value.t_w_YN,
            t_w_height: value.t_w_height,
            t_w_handle_YN: value.t_w_handle_YN,
            t_w_temperature_braille_YN: value.t_w_temperature_braille_YN,
            t_w_child_washstand_YN: value.t_w_child_washstand_YN,
            t_w_wheelchair_possible_YN: value.t_w_wheelchair_possible_YN,
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
    if (value.t_w_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.t_w_YN === "Y" && value.t_w_height === (null || "" || 0)) ||
      (value.t_w_YN === "Y" && value.t_w_handle_YN === null) ||
      (value.t_w_YN === "Y" && value.t_w_temperature_braille_YN === null) ||
      (value.t_w_YN === "Y" && value.t_w_child_washstand_YN === null) ||
      (value.t_w_YN === "Y" && value.t_w_wheelchair_possible_YN === null)
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
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
                title="세면대 유무"
                getCheck={getCheck}
                name="t_w_YN"
                value={value.t_w_YN}
                yes="있다"
                no="없다"
              />
              {value.t_w_YN === "Y" ? (
                <>
                  <View
                    style={{
                      position: "relative",
                    }}
                  >
                    <Input
                      title="세면대 높이"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_w_height"
                      value={value.t_w_height}
                    />
                    <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>
                  </View>
                  <RadioBtn
                    title="세면대 손잡이"
                    getCheck={getCheck}
                    name="t_w_handle_YN"
                    value={value.t_w_handle_YN}
                  />
                  <RadioBtn
                    title="냉온수 점자 구분 여부"
                    getCheck={getCheck}
                    name="t_w_temperature_braille_YN"
                    value={value.t_w_temperature_braille_YN}
                  />
                  <RadioBtn
                    title="어린이용 세면대 유무"
                    getCheck={getCheck}
                    name="t_w_child_washstand_YN"
                    value={value.t_w_child_washstand_YN}
                  />
                  <RadioBtn
                    title="휠체어 탑승 세면대 사용 가능 여부"
                    getCheck={getCheck}
                    name="t_w_wheelchair_possible_YN"
                    value={value.t_w_wheelchair_possible_YN}
                  />
                </>
              ) : null}
              <View style={styles.img}>
                {value.t_w_YN === "Y" ? (
                  <>
                    <TakePhoto
                      title="세면대"
                      name="p_t_w_washstandImg"
                      getImage={getImage}
                      value={value.p_t_w_washstandImg}
                    />
                    {value.t_w_handle_YN === "Y" ? (
                      <TakePhoto
                        title="세면대 손잡이"
                        name="p_t_w_handleImg"
                        getImage={getImage}
                        value={value.p_t_w_handleImg}
                      />
                    ) : null}
                    {value.t_w_temperature_braille_YN === "Y" ? (
                      <TakePhoto
                        title="냉온수 점자 구분"
                        name="p_t_w_temperatureBraileImg"
                        getImage={getImage}
                        value={value.p_t_w_temperatureBraileImg}
                      />
                    ) : null}
                    {value.t_w_child_washstand_YN === "Y" ? (
                      <TakePhoto
                        title="어린이용 세면대"
                        name="p_t_w_childwashstandImg"
                        getImage={getImage}
                        value={value.p_t_w_childwashstandImg}
                      />
                    ) : null}
                    {value.t_w_wheelchair_possible_YN === "Y" ? (
                      <TakePhoto
                        title="휠체어 탑승 세면대"
                        name="p_t_w_childwashstandImg"
                        getImage={getImage}
                        value={value.p_t_w_childwashstandImg}
                      />
                    ) : null}
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
