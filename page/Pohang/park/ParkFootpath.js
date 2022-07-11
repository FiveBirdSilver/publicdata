import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import uploadImgToGcs from "../../component/util";
import RadioBtn from "../../component/RadioBtn";

export default function ParkFootpath({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getCheck = (val, name) => {
    setValue((value) => ({
      ...value,
      [name]: val,
    }));
  };

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/park/getparkfootpath`, {
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
      .post(`${API}/api/pohang/park/setparkfootpath`, {
        team_skey: teamKey,
        list_skey: listKey,
        p_f_YN: value.p_f_YN,
        p_f_wheelchair_accessible_YN: value.p_f_wheelchair_accessible_YN,
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
    if (value.p_f_YN === null || value.p_f_wheelchair_accessible_YN === null) {
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
