import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import Input from "../../component/Input";

import RadioBtn from "../../component/RadioBtn";

export default function InteriorEntrance({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getCheck = (val, name) => {
    if (name === "t_ie_road_chin_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        t_ie_road_chin_height: 0,
      }));
    }
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
  console.log(value);
  useEffect(() => {
    axios
      .post(`${API}/api/pohang/toilet/getinteriorentrance`, {
        team_skey: teamKey,
        list_skey: listKey,
      })
      .then((res) => {
        setValue(JSON.parse(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const DataSave = () => {
    axios
      .post(`${API}/api/pohang/toilet/setinteriorentrance`, {
        team_skey: teamKey,
        list_skey: listKey,
        t_ie_doortype: value.t_ie_doortype,
        t_ie_width: value.t_ie_width,
        t_ie_lock_YN: value.t_ie_lock_YN,
        t_ie_silhouette_YN: value.t_ie_silhouette_YN,
        t_ie_road_chin_YN: value.t_ie_road_chin_YN,
        t_ie_road_chin_height: value.t_ie_road_chin_height,
      })
      .then((res) => {
        const response = JSON.parse(res.data);
        if (response.result === 1) {
          Alert.alert("저장되었습니다.");
          navigation.goBack();
        } else Alert.alert("저장에 실패했습니다. 다시 시도해주세요.");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("저장에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const handleOnSubmit = async () => {
    if (
      value.t_ie_doortype === null ||
      value.t_ie_doortype === "" ||
      value.t_ie_width === null ||
      value.t_ie_width === "" ||
      value.t_ie_lock_YN === null ||
      value.t_ie_silhouette_YN === null ||
      value.t_ie_road_chin_YN === null
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.t_ie_road_chin_YN === "Y" && value.t_ie_road_chin_height === null) ||
      (value.t_ie_road_chin_YN === "Y" && value.t_ie_road_chin_height === "") ||
      (value.t_ie_road_chin_YN === "Y" && value.t_ie_road_chin_height === 0)
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
              <Input
                title="문 유형"
                getText={getText}
                name="t_ie_doortype"
                placeholder="EX. 여닫이 문"
                value={value.t_ie_doortype}
              />
              <View
                style={{
                  position: "relative",
                }}
              >
                <Input
                  title="문 폭"
                  getText={getText}
                  name="t_ie_width"
                  value={value.t_ie_width}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>
              </View>
              <RadioBtn
                title="잠금장치 유무"
                getCheck={getCheck}
                name="t_ie_lock_YN"
                value={value.t_ie_lock_YN}
                yes="있다"
                no="없다"
              />
              <RadioBtn
                title="실루엣 보임 여부"
                getCheck={getCheck}
                name="t_ie_silhouette_YN"
                value={value.t_ie_silhouette_YN}
              />
              <RadioBtn title="턱 유무" getCheck={getCheck} name="t_ie_road_chin_YN" value={value.t_ie_road_chin_YN} />
              {value.t_ie_road_chin_YN === "Y" ? (
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Input
                    title="턱 높이"
                    getText={getText}
                    name="t_ie_road_chin_height"
                    value={value.t_ie_road_chin_height}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>
                </View>
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
