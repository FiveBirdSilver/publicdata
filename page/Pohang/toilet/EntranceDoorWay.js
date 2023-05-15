import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import Input from "../../component/Input";

import RadioBtn from "../../component/RadioBtn";

export default function EntranceDoorWay({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getCheck = (val, name) => {
    if (name === "t_ed_road_chin_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        t_ed_road_chin_YN: "N",
        t_ed_road_chin_height: 0,
      }));
    } else
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
  useEffect(() => {
    axios
      .post(`${API}/api/pohang/toilet/getentrancedoorway`, {
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
      .post(`${API}/api/pohang/toilet/setentrancedoorway`, {
        team_skey: teamKey,
        list_skey: listKey,
        t_ed_road_chin_YN: value.t_ed_road_chin_YN,
        t_ed_road_chin_height: value.t_ed_road_chin_height,
        t_ed_width: value.t_ed_width,
        t_ed_doortype: value.t_ed_doortype,
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
      value.t_ed_road_chin_YN === null ||
      value.t_ed_width === null ||
      value.t_ed_width === "" ||
      value.t_ed_doortype === null ||
      value.t_ed_doortype === ""
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.t_ed_road_chin_YN === "Y" && value.t_ed_road_chin_height === null) ||
      (value.t_ed_road_chin_YN === "Y" && value.t_ed_road_chin_height === "") ||
      (value.t_ed_road_chin_YN === "Y" && value.t_ed_road_chin_height === 0)
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
                title="턱 유무"
                getCheck={getCheck}
                name="t_ed_road_chin_YN"
                value={value.t_ed_road_chin_YN}
                yes="있다"
                no="없다"
              />
              {value.t_ed_road_chin_YN === "Y" ? (
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Input
                    title="턱 높이"
                    getText={getText}
                    name="t_ed_road_chin_height"
                    value={value.t_ed_road_chin_height}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>
                </View>
              ) : null}
              <View
                style={{
                  position: "relative",
                }}
              >
                <Input
                  title="폭"
                  getText={getText}
                  name="t_ed_width"
                  value={value.t_ed_width}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>
              </View>
              <Input
                title="문 유형"
                getText={getText}
                name="t_ed_doortype"
                placeholder="EX. 여닫이 문"
                value={value.t_ed_doortype}
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
