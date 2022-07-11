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

  const getCheck = (val, name) => {
    setValue((value) => ({
      ...value,
      [name]: val,
    }));
  };

  const getText = (text, name) => {
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
      value.cr_f_floor_material === "" ||
      value.cr_f_waterspout_width === ""
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (value.cr_f_wheelchair_accessible_YN === "Y" && value.p_cr_f_footpathMoveImg === "") {
      if (
        image.find((i) => i.name === "p_cr_f_footpathMoveImg") === undefined ||
        image.find((i) => i.name === "p_cr_f_footpathMoveImg").url === ""
      ) {
        Alert.alert("휠체어 이동 가능 사진을 추가해주세요."); // 최초 insert 방어
      } else DataSave();
    } else if (value.p_cr_f_footpathMoveImg !== "") {
      // 이미지가 이미 존재할 때
      if (image.length === 0) DataSave();
      else if (image.length > 0 && image.find((i) => i.name === "p_cr_f_footpathMoveImg").url === "") {
        Alert.alert("휠체어 이동 가능 사진을 추가해주세요."); // 수정 update 방어
      } else DataSave();
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

              <View style={styles.img}>
                {value.cr_f_wheelchair_accessible_YN === "Y" ? (
                  <TakePhoto
                    title="휠체어 이동 가능"
                    name="p_cr_f_footpathMoveImg"
                    getImage={getImage}
                    value={value.p_cr_f_footpathMoveImg}
                  />
                ) : null}
                {value.cr_f_street_lamp_YN === "Y" ? (
                  <TakePhoto
                    title="야간 조명"
                    name="p_cr_f_streetlampImg"
                    getImage={getImage}
                    value={value.p_cr_f_streetlampImg}
                  />
                ) : null}
              </View>
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
