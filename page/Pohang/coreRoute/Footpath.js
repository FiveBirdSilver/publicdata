import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";
import Input from "../../component/Input";
import RadioBtn from "../../component/RadioBtn";

export default function Footpath({ route, navigation }) {
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

  const getText = (text, name) => {
    if (name === "cr_f_waterspout_width" && text === "") {
      setValue((value) => ({
        ...value,
        cr_f_waterspout_width: 0,
      }));
    } else
      setValue((value) => ({
        ...value,
        [name]: text,
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

    if (uri !== "") {
      setImageLength(imageLength + 1);
    } else if (uri === "") {
      setImageLength(imageLength - 1);
    }
    setImage(tmp);
  };

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/coreroute/getfootpath`, {
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
        console.log("실행");
        axios
          .post(`${API}/api/pohang/coreroute/setfootpath`, {
            team_skey: teamKey,
            list_skey: listKey,
            cr_f_street_lamp_YN: value.cr_f_street_lamp_YN,
            cr_f_wheelchair_accessible_YN: value.cr_f_wheelchair_accessible_YN,
            cr_f_floor_material: value.cr_f_floor_material,
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
        navigation.goBack();
      });
  };
  const handleOnSubmit = async () => {
    if (
      value.cr_f_street_lamp_YN === null ||
      value.cr_f_wheelchair_accessible_YN === null ||
      value.cr_f_floor_material === null ||
      value.cr_f_floor_material === ""
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (value.cr_f_street_lamp_YN === "N" && value.cr_f_waterspout_width === 0 && imageLength !== 2) {
      Alert.alert("반드시 하나의 사진을 추가해 주세요.");
    } else if (value.cr_f_street_lamp_YN === "N" && value.cr_f_waterspout_width !== 0 && imageLength !== 3) {
      Alert.alert("사진을 추가해 주세요.");
    } else if (value.cr_f_street_lamp_YN === "Y" && value.cr_f_waterspout_width === 0 && imageLength !== 3) {
      Alert.alert("사진을 추가해 주세요.");
    } else if (value.cr_f_street_lamp_YN === "Y" && value.cr_f_waterspout_width !== 0 && imageLength !== 4) {
      Alert.alert("사진을 추가해 주세요.");
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
                title="휠체어 이동 가능 유무"
                getCheck={getCheck}
                name="cr_f_wheelchair_accessible_YN"
                value={value.cr_f_wheelchair_accessible_YN}
                yes="있다"
                no="없다"
              />
              <RadioBtn
                title="야간 조명 유무"
                getCheck={getCheck}
                name="cr_f_street_lamp_YN"
                value={value.cr_f_street_lamp_YN}
              />
              <View
                style={{
                  position: "relative",
                }}
              >
                <Input
                  title="바닥 재질"
                  getText={getText}
                  name="cr_f_floor_material"
                  value={value.cr_f_floor_material}
                  placeholder="EX. 아스팔트"
                />
                <Input
                  title="배수 트렌치 간격"
                  getText={getText}
                  name="cr_f_waterspout_width"
                  value={value.cr_f_waterspout_width}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 63, right: 10 }}>cm</Text>
              </View>
              <View style={styles.img}>
                <TakePhoto
                  title="휠체어 이동 가능"
                  name="p_cr_f_footpathMoveImg"
                  getImage={getImage}
                  value={value.p_cr_f_footpathMoveImg}
                />
                {value.cr_f_street_lamp_YN === "Y" ? (
                  <TakePhoto
                    title="야간 조명"
                    name="p_cr_f_streetlampImg"
                    getImage={getImage}
                    value={value.p_cr_f_streetlampImg}
                  />
                ) : null}
                <TakePhoto
                  title="바닥 재질"
                  name="p_cr_f_materialImg"
                  getImage={getImage}
                  value={value.p_cr_f_materialImg}
                />
                {value.cr_f_waterspout_width !== null &&
                value.cr_f_waterspout_width !== "" &&
                value.cr_f_waterspout_width !== 0 ? (
                  <TakePhoto
                    title="배수 트렌치"
                    name="p_cr_f_waterspoutImg"
                    getImage={getImage}
                    value={value.p_cr_f_waterspoutImg}
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
