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

export default function Inside({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState([]);

  const getCheck = (val, name) => {
    if (name === "in_table_YN" && val === "N") {
      setValue((value) => ({
        in_table_YN: "N",
        in_table_height: 0,
        in_table_spacing: 0,
        in_table_width: 0,
      }));
    } else
      setValue((value) => ({
        ...value,
        [name]: val,
      }));
  };
  console.log(value);
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
      .post(`${API}/api/daegu/company/getinside`, {
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
          .post(`${API}/api/daegu/company/setinside`, {
            team_skey: teamKey,
            list_skey: listKey,
            in_table_YN: value.in_table_YN,
            in_standing_YN: value.in_standing_YN,
            in_table_spacing: value.in_table_spacing,
            in_table_height: value.in_table_height,
            in_table_width: value.in_table_width,
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
    if (value.in_table_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      value.in_standing_YN === null ||
      (value.in_table_YN === "Y" && value.in_table_spacing === null) ||
      (value.in_table_YN === "Y" && value.in_table_spacing === "") ||
      (value.in_table_YN === "Y" && value.in_table_height === null) ||
      (value.in_table_YN === "Y" && value.in_table_height === "") ||
      (value.in_table_YN === "Y" && value.in_table_width === null) ||
      (value.in_table_YN === "Y" && value.in_table_width === "")
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (value.in_table_YN === "Y" && imageLength === 0) {
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
                title="테이블 유무"
                getCheck={getCheck}
                name="in_table_YN"
                value={value.in_table_YN}
                yes="있다"
                no="없다"
              />
              {value.in_table_YN === "Y" ? (
                <>
                  <RadioBtn title="입식 유무" getCheck={getCheck} name="in_standing_YN" value={value.in_standing_YN} />
                  <View style={{ position: "relative" }}>
                    <Input
                      title="테이블 사이의 간격"
                      getText={getText}
                      name="in_table_spacing"
                      value={value.in_table_spacing}
                      keyboardType={"numeric"}
                    />
                    <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>
                    <Input
                      title="테이블 높이"
                      getText={getText}
                      name="in_table_height"
                      value={value.in_table_height}
                      keyboardType={"numeric"}
                    />
                    <Text style={{ position: "absolute", top: 63, right: 10 }}>cm</Text>
                    <Input
                      title="테이블 폭"
                      getText={getText}
                      name="in_table_width"
                      value={value.in_table_width}
                      keyboardType={"numeric"}
                    />
                    <Text style={{ position: "absolute", top: 113, right: 10 }}>cm</Text>
                  </View>
                  <View style={styles.img}>
                    <TakePhoto title="사진 1" name="d_c_in_photo1" getImage={getImage} value={value.d_c_in_photo1} />
                    <TakePhoto title="사진 2" name="d_c_in_photo2" getImage={getImage} value={value.d_c_in_photo2} />
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
