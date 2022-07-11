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

  const getCheck = (val, name) => {
    if (name === "p_b_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        p_b_YN: "N",
        p_b_name: "",
        p_b_parking_address: "",
        p_b_width: 0,
        p_b_length: 0,
        p_b_floor_material: "",
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
      .post(`${API}/api/pohang/park/getbasic`, {
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
          .post(`${API}/api/pohang/park/setbasic`, {
            team_skey: teamKey,
            list_skey: listKey,
            p_b_YN: value.p_b_YN,
            p_b_name: value.p_b_name,
            p_b_parking_address: value.p_b_parking_address,
            p_b_width: value.p_b_width,
            p_b_length: value.p_b_length,
            p_b_floor_material: value.p_b_floor_material,
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
    if (value.p_b_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.p_b_YN === "Y" && value.p_b_name === (null || "")) ||
      (value.p_b_YN === "Y" && value.p_b_parking_address === (null || "")) ||
      (value.p_b_YN === "Y" && value.p_b_width === (null || "" || 0)) ||
      (value.p_b_YN === "Y" && value.p_b_length === (null || "" || 0)) ||
      (value.p_b_YN === "Y" && value.p_b_floor_material === (null || ""))
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
                title="주차장 유무"
                getCheck={getCheck}
                name="p_b_YN"
                value={value.p_b_YN}
                yes="있다"
                no="없다"
              />

              {value.p_b_YN === "Y" ? (
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Input title="주차장 이름" getText={getText} name="p_b_name" value={value.p_b_name} />
                  <Input
                    title="주차장 주소"
                    getText={getText}
                    name="p_b_parking_address"
                    value={value.p_b_parking_address}
                  />
                  <Input
                    title="일반 주차 면적 가로"
                    getText={getText}
                    name="p_b_width"
                    value={value.p_b_width}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 113, right: 10 }}>cm</Text>

                  <Input
                    title="일반 주차 면적 세로"
                    getText={getText}
                    name="p_b_length"
                    keyboardType={"numeric"}
                    value={value.p_b_length}
                  />
                  <Text style={{ position: "absolute", top: 163, right: 10 }}>cm</Text>

                  <Input
                    title="바닥 재질"
                    getText={getText}
                    name="p_b_floor_material"
                    value={value.p_b_floor_material}
                    placeholder="EX. 아스팔트 , 흙"
                  />
                </View>
              ) : null}
              <View style={styles.img}>
                {value.p_b_YN === "Y" ? (
                  <>
                    <TakePhoto title="주차장" name="p_p_b_parkImg" getImage={getImage} value={value.p_p_b_parkImg} />
                    <TakePhoto
                      title="바닥 재질"
                      name="p_p_b_materiaImg"
                      getImage={getImage}
                      value={value.p_p_b_materiaImg}
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
