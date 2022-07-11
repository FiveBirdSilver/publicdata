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

export default function Runway({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getCheck = (val, name) => {
    if (name === "cr_r_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        cr_r_YN: "N",
        cr_r_handle_YN: "N",
        cr_r_handle_braille_YN: "N",
        cr_r_slope: 0,
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
      .post(`${API}/api/pohang/coreroute/getrunway`, {
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
        console.log("실행");
        axios
          .post(`${API}/api/pohang/coreroute/setrunway`, {
            team_skey: teamKey,
            list_skey: listKey,
            cr_r_YN: value.cr_r_YN,
            cr_r_handle_YN: value.cr_r_handle_YN,
            cr_r_handle_braille_YN: value.cr_r_handle_braille_YN,
            cr_f_waterspout_width: value.cr_f_waterspout_width,
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
  console.log(value);
  const handleOnSubmit = async () => {
    if (value.cr_r_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.cr_r_YN === "Y" && value.cr_r_YN === (null || "")) ||
      (value.cr_r_YN === "Y" && value.cr_r_handle_YN === (null || "")) ||
      (value.cr_r_YN === "Y" && value.cr_r_handle_braille_YN === (null || "")) ||
      (value.cr_r_YN === "Y" && value.cr_r_slope === (null || "" || 0))
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
                title="경사로 유무"
                getCheck={getCheck}
                name="cr_r_YN"
                value={value.cr_r_YN}
                yes="있다"
                no="없다"
              />
              {value.cr_r_YN === "Y" ? (
                <>
                  <RadioBtn
                    title="경사로 손잡이 유무"
                    getCheck={getCheck}
                    name="cr_r_handle_YN"
                    value={value.cr_r_handle_YN}
                  />
                  <RadioBtn
                    title="경사로 손잡이 점자 유무 (시작과 끝)"
                    getCheck={getCheck}
                    name="cr_r_handle_braille_YN"
                    value={value.cr_r_handle_braille_YN}
                  />
                </>
              ) : null}

              <View style={styles.img}>
                {value.cr_r_YN === "Y" ? (
                  <>
                    <TakePhoto
                      title="경사로"
                      name="p_cr_f_streetlampImg"
                      getImage={getImage}
                      value={value.p_cr_f_streetlampImg}
                    />
                    {value.cr_r_handle_YN === "Y" ? (
                      <TakePhoto
                        title="경사로 손잡이"
                        name="p_cr_f_streetlampImg"
                        getImage={getImage}
                        value={value.p_cr_f_streetlampImg}
                      />
                    ) : null}
                    {value.cr_r_handle_braille_YN === "Y" ? (
                      <TakePhoto
                        title="경사로 손잡이 점자"
                        name="p_cr_f_streetlampImg"
                        getImage={getImage}
                        value={value.p_cr_f_streetlampImg}
                      />
                    ) : null}
                  </>
                ) : null}
              </View>

              {value.cr_r_YN === "Y" ? (
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Input
                    title="경사로 경사"
                    getText={getText}
                    name="cr_r_slope"
                    value={value.cr_r_slope}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 7, right: 10 }}>◦</Text>
                </View>
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
