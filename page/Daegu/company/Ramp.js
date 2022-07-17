import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import Input from "../../component/Input";

import RadioBtn from "../../component/RadioBtn";
import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";

export default function Ramp({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState([]);

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
      .post(`${API}/api/daegu/company/getramp`, {
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
          .post(`${API}/api/daegu/company/setramp`, {
            team_skey: teamKey,
            list_skey: listKey,
            dw_ramp_YN: value.dw_ramp_YN,
            dw_ramp_handle_YN: value.dw_ramp_handle_YN,
            dw_ramp_braille_YN: value.dw_ramp_braille_YN,
            dw_ramp_antislip_YN: value.dw_ramp_antislip_YN,
            dw_ramp_width: value.dw_ramp_width,
            dw_ramp_angle: value.dw_ramp_angle,
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
              Alert.alert("저장에 실패했습니다. 다시 시도해 주세요.");
              navigation.goBack();
            }
          })
          .catch((err) => {
            console.log(err);
            setModalVisible(false);
            Alert.alert("저장에 실패했습니다. 다시 시도해 주세요.");
            navigation.goBack();
          });
      })
      .catch((err) => {
        setModalVisible(false);
        console.log("에러발생");
        Alert.alert("저장에 실패했습니다. 필수 사진이 추가되었는지 확인해 주세요.");
      });
  };
  const handleOnSubmit = async () => {
    if (
      value.dw_ramp_YN === null ||
      value.dw_ramp_handle_YN === null ||
      value.dw_ramp_braille_YN === null ||
      value.dw_ramp_antislip_YN === null ||
      value.dw_ramp_width === null ||
      value.dw_ramp_width === "" ||
      value.dw_ramp_angle === null ||
      value.dw_ramp_angle === ""
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (imageLength === 0) {
      Alert.alert("반드시 하나의 사진을 추가해 주세요.");
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
                title="입구 경사 유무"
                getCheck={getCheck}
                name="dw_ramp_YN"
                value={value.dw_ramp_YN}
                yes="있다"
                no="없다"
              />
              {value.dw_ramp_YN === "Y" ? (
                <>
                  <RadioBtn
                    title="손잡이 유무"
                    getCheck={getCheck}
                    name="dw_ramp_handle_YN"
                    value={value.dw_ramp_handle_YN}
                  />
                  <RadioBtn
                    title="손잡이 점자표기 유무"
                    getCheck={getCheck}
                    name="dw_ramp_braille_YN"
                    value={value.dw_ramp_braille_YN}
                  />
                  <RadioBtn
                    title="미끄럼 방지판 유무"
                    getCheck={getCheck}
                    name="dw_ramp_antislip_YN"
                    value={value.dw_ramp_antislip_YN}
                  />
                  <View style={{ position: "relative" }}>
                    <Input
                      title="가로 폭"
                      getText={getText}
                      name="dw_ramp_width"
                      value={value.dw_ramp_width}
                      keyboardType={"numeric"}
                    />
                    <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>
                    <Input
                      title="경사면 각도"
                      getText={getText}
                      name="dw_ramp_angle"
                      value={value.dw_ramp_angle}
                      keyboardType={"numeric"}
                    />
                    <Text style={{ position: "absolute", top: 63, right: 10 }}>◦</Text>
                  </View>

                  <View style={styles.img}>
                    <TakePhoto
                      title="사진 1"
                      name="d_c_dw_ramp_photo1"
                      getImage={getImage}
                      value={value.d_c_dw_ramp_photo1}
                    />
                    <TakePhoto
                      title="사진 2"
                      name="d_c_dw_ramp_photo2"
                      getImage={getImage}
                      value={value.d_c_dw_ramp_photo2}
                    />
                  </View>
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
