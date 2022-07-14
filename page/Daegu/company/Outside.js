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

export default function Outside({ route, navigation }) {
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
      .post(`${API}/api/daegu/company/getoutside`, {
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
          .post(`${API}/api/daegu/company/setoutside`, {
            team_skey: teamKey,
            list_skey: listKey,
            out_parking_YN: value.out_parking_YN,
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
    if (value.out_parking_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (value.out_parking_YN === "Y" && imageLength === 0) {
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
                title="장애인 주차장 유무"
                getCheck={getCheck}
                name="out_parking_YN"
                value={value.out_parking_YN}
                yes="있다"
                no="없다"
              />

              <View style={styles.img}>
                <TakePhoto title="사진 1" name="d_c_out_photo1" getImage={getImage} value={value.d_c_out_photo1} />
                <TakePhoto title="사진 2" name="d_c_out_photo2" getImage={getImage} value={value.d_c_out_photo2} />
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
