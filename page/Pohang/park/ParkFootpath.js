import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import RadioBtn from "../../component/RadioBtn";
import Input from "../../component/Input";
import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";

export default function ParkFootpath({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState([]);
  const [imageLength, setImageLength] = useState([]);
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
    if (uri !== "") {
      setImageLength(imageLength + 1);
    } else if (uri === "") {
      setImageLength(imageLength - 1);
    }
  };
  useEffect(() => {
    axios
      .post(`${API}/api/pohang/park/getparkfootpath`, {
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
          .post(`${API}/api/pohang/park/setparkfootpath`, {
            team_skey: teamKey,
            list_skey: listKey,
            p_f_YN: value.p_f_YN,
            p_f_wheelchair_accessible_YN: value.p_f_wheelchair_accessible_YN,
            p_f_etc: value.p_f_etc,
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
    if (value.p_f_YN === null || value.p_f_wheelchair_accessible_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (imageLength === 0) {
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
                title="보행안전 통로 설치 유무"
                getCheck={getCheck}
                name="p_f_YN"
                value={value.p_f_YN}
                yes="있다"
                no="없다"
              />
              <RadioBtn
                title="목적지까지 휠체어 이동 가능 여부"
                getCheck={getCheck}
                name="p_f_wheelchair_accessible_YN"
                value={value.p_f_wheelchair_accessible_YN}
              />
              <Input title="기타" getText={getText} name="p_f_etc" value={value.p_f_etc} />
            </View>
            <View style={styles.img}>
              <TakePhoto
                title="목적지까지 휠체어 이동 가능"
                name="p_p_f_wheelchair_accessibleImg"
                getImage={getImage}
                value={value.p_p_f_wheelchair_accessibleImg}
              />
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
