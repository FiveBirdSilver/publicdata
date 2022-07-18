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

  const getCheck = (val, name) => {
    if (name === "eto_b_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        eto_b_YN: "N",
        eto_b_name: "",
        eto_b_floor_material: "",
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
      .post(`${API}/api/pohang/eto/getbasic`, {
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
          .post(`${API}/api/pohang/eto/setbasic`, {
            team_skey: teamKey,
            list_skey: listKey,
            eto_b_YN: value.eto_b_YN,
            eto_b_name: value.eto_b_name,
            eto_b_floor_material: value.eto_b_floor_material,
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
    if (value.eto_b_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.eto_b_YN === "Y" && value.eto_b_name === null) ||
      (value.eto_b_YN === "Y" && value.eto_b_name === "") ||
      (value.eto_b_YN === "Y" && value.eto_b_floor_material === null) ||
      (value.eto_b_YN === "Y" && value.eto_b_floor_material === "")
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (value.eto_b_YN === "Y" && imageLength !== 2) {
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
                title="입구•매표소 유무"
                getCheck={getCheck}
                name="eto_b_YN"
                value={value.eto_b_YN}
                yes="있다"
                no="없다"
              />
              {value.eto_b_YN === "Y" ? (
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Input title="입구•매표소 이름" getText={getText} name="eto_b_name" value={value.eto_b_name} />
                  <Input
                    title="바닥 재질"
                    getText={getText}
                    name="eto_b_floor_material"
                    value={value.eto_b_floor_material}
                    placeholder="EX. 아스팔트"
                  />
                </View>
              ) : null}

              <View style={styles.img}>
                {value.eto_b_YN === "Y" ? (
                  <>
                    <TakePhoto
                      title="입구•매표소"
                      name="p_eto_b_etoImg"
                      getImage={getImage}
                      value={value.p_eto_b_etoImg}
                    />
                    <TakePhoto
                      title="바닥 재질"
                      name="p_eto_b_materialImg"
                      getImage={getImage}
                      value={value.p_eto_b_materialImg}
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
