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
export default function ParkingArea({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
  };

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/park/getparkingarea`, {
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
  console.log(value);
  const DataSave = () => {
    setModalVisible(true);
    uploadImgToGcs(image, regionKey, region, listKey, dataCollection, data)
      .then((result) => {
        console.log("실행");
        axios
          .post(`${API}/api/pohang/park/setparkingarea`, {
            team_skey: teamKey,
            list_skey: listKey,
            p_pa_count: value.p_pa_count,
            p_pa_disabled_count: value.p_pa_disabled_count,
            p_b_disabled_width: value.p_b_disabled_width,
            p_b_disabled_length: value.p_b_disabled_length,
            p_pa_pregnant_count: value.p_pa_pregnant_count,
            p_pa_bus_count: value.p_pa_bus_count,
            p_pa_electric_count: value.p_pa_electric_count,
            p_pa_disabled_sign_YN: value.p_pa_disabled_sign_YN,
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
    if (
      value.p_pa_count === (null || "") ||
      value.p_pa_disabled_count === (null || "") ||
      value.p_b_disabled_width === (null || "") ||
      value.p_b_disabled_length === (null || "") ||
      value.p_pa_pregnant_count === (null || "") ||
      value.p_pa_bus_count === (null || "") ||
      value.p_pa_electric_count === (null || "") ||
      value.p_pa_disabled_sign_YN === (null || "")
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
              <View
                style={{
                  position: "relative",
                }}
              >
                <Input
                  title="총 주차 면수"
                  getText={getText}
                  name="p_pa_count"
                  value={value.p_pa_count}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 13, right: 10 }}>개</Text>
                <Input
                  title="장애인 주차 면수"
                  getText={getText}
                  name="p_pa_disabled_count"
                  value={value.p_pa_disabled_count}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 63, right: 10 }}>개</Text>
                <Input
                  title="장애인 주차 면적 가로"
                  getText={getText}
                  name="p_b_disabled_width"
                  value={value.p_b_disabled_width}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 113, right: 10 }}>cm</Text>
                <Input
                  title="장애인 주차 면적 세로"
                  getText={getText}
                  name="p_b_disabled_length"
                  value={value.p_b_disabled_length}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 163, right: 10 }}>cm</Text>
                <Input
                  title="임산부 주차 면수"
                  getText={getText}
                  name="p_pa_pregnant_count"
                  value={value.p_pa_pregnant_count}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 213, right: 10 }}>개</Text>

                <Input
                  title="대형버스 주차 면수"
                  getText={getText}
                  name="p_pa_bus_count"
                  value={value.p_pa_bus_count}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 263, right: 10 }}>개</Text>

                <Input
                  title="전기차 주차 면수"
                  getText={getText}
                  name="p_pa_electric_count"
                  value={value.p_pa_electric_count}
                  keyboardType={"numeric"}
                />
                <Text style={{ position: "absolute", top: 313, right: 10 }}>개</Text>
              </View>

              <RadioBtn
                title="장애인 주차구역 표지판"
                getCheck={getCheck}
                name="p_pa_disabled_sign_YN"
                value={value.p_pa_disabled_sign_YN}
                yes="있다"
                no="없다"
              />
              <View style={styles.img}>
                {value.p_pa_disabled_count !== null && value.p_pa_disabled_count > 0 ? (
                  <TakePhoto
                    title="장애인 주차장"
                    name="p_p_pa_disabledParkImg"
                    getImage={getImage}
                    value={value.p_p_pa_disabledParkImg}
                  />
                ) : null}
                {value.p_pa_disabled_sign_YN === "Y" ? (
                  <TakePhoto
                    title="장애인 주차구역 표지판"
                    name="p_p_pa_disabledSignImg"
                    getImage={getImage}
                    value={value.p_p_pa_disabledSignImg}
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
