import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import Input from "../../component/Input";

import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";
import RadioBtn from "../../component/RadioBtn";

export default function Door({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState([]);

  const getCheck = (val, name) => {
    if (name === "to_door_hinged_YN" && val === "Y") {
      setValue({
        ...value,
        to_door_hinged_YN: "Y",
        to_door_automatic_YN: "N",
        to_door_sliding_YN: "N",
      });
    } else if (name === "to_door_sliding_YN" && val === "Y") {
      setValue({
        ...value,
        to_door_sliding_YN: "Y",
        to_door_automatic_YN: "N",
        to_door_hinged_YN: "N",
      });
    } else if (name === "to_door_automatic_YN" && val === "Y") {
      setValue({
        ...value,
        to_door_automatic_YN: "Y",
        to_door_sliding_YN: "N",
        to_door_hinged_YN: "N",
      });
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
      .post(`${API}/api/daegu/toilet/getdoor`, {
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
        axios
          .post(`${API}/api/daegu/toilet/setdoor`, {
            team_skey: teamKey,
            list_skey: listKey,
            to_door_sliding_YN: value.to_door_sliding_YN,
            to_door_hinged_YN: value.to_door_hinged_YN,
            to_door_automatic_YN: value.to_door_automatic_YN,
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
    if (value.to_door_sliding_YN === null || value.to_door_hinged_YN === null || value.to_door_automatic_YN === null) {
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
                title="미닫이문 유무"
                getCheck={getCheck}
                name="to_door_sliding_YN"
                value={value.to_door_sliding_YN}
                yes="있다"
                no="없다"
              />
              <RadioBtn
                title="여닫이문 유무"
                getCheck={getCheck}
                name="to_door_hinged_YN"
                value={value.to_door_hinged_YN}
              />
              <RadioBtn
                title="버튼식 자동문 유무"
                getCheck={getCheck}
                name="to_door_automatic_YN"
                value={value.to_door_automatic_YN}
              />
              <View style={styles.img}>
                <TakePhoto title="사진 1" name="d_t_door_photo1" getImage={getImage} value={value.d_t_door_photo1} />
                <TakePhoto title="사진 2" name="d_t_door_photo2" getImage={getImage} value={value.d_t_door_photo2} />
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
