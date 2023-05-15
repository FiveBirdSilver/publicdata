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

export default function Entrance({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState([]);
  const yLength = Object.values(value).filter((i) => i === "Y").length;

  const getCheck = (val, name) => {
    if (name === "t_er_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        t_er_YN: "N",
        t_er_slope: 0,
        t_er_length: 0,
        t_er_width: 0,
      }));
    } else if (name === "t_er_road_chin_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        t_er_road_chin_YN: "N",
        t_er_road_chin_height: 0,
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
      .post(`${API}/api/pohang/toilet/getentrance`, {
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
          .post(`${API}/api/pohang/toilet/setentrance`, {
            team_skey: teamKey,
            list_skey: listKey,
            t_er_YN: value.t_er_YN,
            t_er_slope: value.t_er_slope,
            t_er_length: value.t_er_length,
            t_er_width: value.t_er_width,
            t_er_road_chin_YN: value.t_er_road_chin_YN,
            t_er_road_chin_height: value.t_er_road_chin_height,
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
    if (value.t_er_YN === null || value.t_er_road_chin_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.t_er_YN === "Y" && value.t_er_slope === null) ||
      (value.t_er_YN === "Y" && value.t_er_slope === "") ||
      (value.t_er_YN === "Y" && value.t_er_slope === 0) ||
      (value.t_er_YN === "Y" && value.t_er_length === null) ||
      (value.t_er_YN === "Y" && value.t_er_length === "") ||
      (value.t_er_YN === "Y" && value.t_er_length === 0) ||
      (value.t_er_YN === "Y" && value.t_er_width === null) ||
      (value.t_er_YN === "Y" && value.t_er_width === "") ||
      (value.t_er_YN === "Y" && value.t_er_width === 0) ||
      (value.t_er_road_chin_YN === "Y" && value.t_er_road_chin_height === null) ||
      (value.t_er_road_chin_YN === "Y" && value.t_er_road_chin_height === "") ||
      (value.t_er_road_chin_YN === "Y" && value.t_er_road_chin_height === 0)
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (value.t_er_YN === "Y" && imageLength !== 1) {
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
                title="경사로 유무"
                getCheck={getCheck}
                name="t_er_YN"
                value={value.t_er_YN}
                yes="있다"
                no="없다"
              />
              {value.t_er_YN === "Y" ? (
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Input
                    title="경사"
                    getText={getText}
                    name="t_er_slope"
                    value={value.t_er_slope}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 13, right: 10 }}>◦</Text>

                  <Input
                    title="길이"
                    getText={getText}
                    name="t_er_length"
                    value={value.t_er_length}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 63, right: 10 }}>cm</Text>
                  <Input
                    title="유효폭"
                    getText={getText}
                    name="t_er_width"
                    value={value.t_er_width}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 113, right: 10 }}>cm</Text>
                </View>
              ) : null}
              <RadioBtn
                title="턱 유무"
                getCheck={getCheck}
                name="t_er_road_chin_YN"
                value={value.t_er_road_chin_YN}
                yes="있다"
                no="없다"
              />
              {value.t_er_road_chin_YN === "Y" ? (
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Input
                    title="턱 높이"
                    getText={getText}
                    name="t_er_road_chin_height"
                    value={value.t_er_road_chin_height}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>
                </View>
              ) : null}

              <View style={styles.img}>
                {value.t_er_YN === "Y" ? (
                  <TakePhoto
                    title="경사로"
                    name="p_t_er_entranceImg"
                    getImage={getImage}
                    value={value.p_t_er_entranceImg}
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
