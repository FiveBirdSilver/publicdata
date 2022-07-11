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
export default function DisabledToilet({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getCheck = (val, name) => {
    if (name === "t_dt_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        t_dt_YN: "N",
        t_dt_doortype: "",
        t_dt_urinal_YN: "N",
        t_dt_toilet_YN: "N",
        t_dt_urinal_handle_YN: "N",
        t_dt_toilet_handle_YN: "N",
        t_dt_urinal_automatic_sensor_YN: "N",
        t_dt_toilet_automatic_sensor_YN: "N",
        t_dt_cleandevice_YN: "N",
        t_dt_urinal_left_width: 0,
        t_dt_urinal_right_width: 0,
        t_dt_urinal_back_width: 0,
        t_dt_urinal_front_width: 0,
        t_dt_left_width: 0,
        t_dt_right_width: 0,
        t_dt_back_width: 0,
        t_dt_front_width: 0,
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
  };

  const getText = (text, name) => {
    setValue((value) => ({
      ...value,
      [name]: text,
    }));
  };

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/toilet/getdisabledtoilet`, {
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

  const DataSave = () => {
    setModalVisible(true);
    uploadImgToGcs(image, regionKey, region, listKey, dataCollection, data)
      .then((result) => {
        axios
          .post(`${API}/api/pohang/toilet/setdisabledtoilet`, {
            team_skey: teamKey,
            list_skey: listKey,
            t_dt_YN: value.t_dt_YN,
            t_dt_doortype: value.t_dt_doortype,
            t_dt_urinal_YN: value.t_dt_urinal_YN,
            t_dt_toilet_YN: value.t_dt_toilet_YN,
            t_dt_urinal_handle_YN: value.t_dt_urinal_handle_YN,
            t_dt_toilet_handle_YN: value.t_dt_toilet_handle_YN,
            t_dt_urinal_automatic_sensor_YN: value.t_dt_urinal_automatic_sensor_YN,
            t_dt_toilet_automatic_sensor_YN: value.t_dt_toilet_automatic_sensor_YN,
            t_dt_urinal_left_width: value.t_dt_urinal_left_width,
            t_dt_urinal_right_width: value.t_dt_urinal_right_width,
            t_dt_urinal_back_width: value.t_dt_urinal_back_width,
            t_dt_urinal_front_width: value.t_dt_urinal_front_width,
            t_dt_left_width: value.t_dt_left_width,
            t_dt_right_width: value.t_dt_right_width,
            t_dt_back_width: value.t_dt_back_width,
            t_dt_front_width: value.t_dt_front_width,
            t_dt_cleandevice_YN: value.t_dt_cleandevice_YN,
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
  console.log(value);
  const handleOnSubmit = async () => {
    if (value.t_dt_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.t_dt_YN === "Y" && value.t_dt_doortype === (null || "")) ||
      (value.t_dt_YN === "Y" && value.t_dt_urinal_YN === null) ||
      (value.t_dt_YN === "Y" && value.t_dt_toilet_YN === null) ||
      (value.t_dt_YN === "Y" && value.t_dt_urinal_handle_YN === null) ||
      (value.t_dt_YN === "Y" && value.t_dt_toilet_handle_YN === null) ||
      (value.t_dt_YN === "Y" && value.t_dt_urinal_automatic_sensor_YN === null) ||
      (value.t_dt_YN === "Y" && value.t_dt_toilet_automatic_sensor_YN === null) ||
      (value.t_dt_YN === "Y" && value.t_dt_urinal_left_width === (null || 0)) ||
      (value.t_dt_YN === "Y" && value.t_dt_urinal_right_width === (null || 0)) ||
      (value.t_dt_YN === "Y" && value.t_dt_urinal_back_width === (null || 0)) ||
      (value.t_dt_YN === "Y" && value.t_dt_urinal_front_width === (null || 0)) ||
      (value.t_dt_YN === "Y" && value.t_dt_left_width === (null || 0)) ||
      (value.t_dt_YN === "Y" && value.t_dt_right_width === (null || 0)) ||
      (value.t_dt_YN === "Y" && value.t_dt_back_width === (null || 0)) ||
      (value.t_dt_YN === "Y" && value.t_dt_front_width === (null || 0)) ||
      (value.t_dt_YN === "Y" && value.t_dt_cleandevice_YN === null)
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else DataSave();
  };
  console.log(value);
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
                title="장애인 화장실 유무"
                getCheck={getCheck}
                name="t_dt_YN"
                value={value.t_dt_YN}
                yes="있다"
                no="없다"
              />
              {value.t_dt_YN === "Y" ? (
                <>
                  <Input
                    title="문 유형"
                    getText={getText}
                    placeholder="EX. 여닫이 문"
                    name="t_dt_doortype"
                    value={value.t_dt_doortype}
                  />
                  <RadioBtn
                    title="소변기 유무"
                    getCheck={getCheck}
                    name="t_dt_urinal_YN"
                    value={value.t_dt_urinal_YN}
                  />
                  <RadioBtn
                    title="대변기 유무"
                    getCheck={getCheck}
                    name="t_dt_toilet_YN"
                    value={value.t_dt_toilet_YN}
                  />
                  <RadioBtn
                    title="소변기 좌우 손잡이 설치 여부"
                    getCheck={getCheck}
                    name="t_dt_urinal_handle_YN"
                    value={value.t_dt_urinal_handle_YN}
                  />
                  <RadioBtn
                    title="대변기 좌우 손잡이 설치 여부"
                    getCheck={getCheck}
                    name="t_dt_toilet_handle_YN"
                    value={value.t_dt_toilet_handle_YN}
                  />
                  <RadioBtn
                    title="소변기 버튼식/자동센서 물 내림 여부"
                    getCheck={getCheck}
                    name="t_dt_urinal_automatic_sensor_YN"
                    value={value.t_dt_urinal_automatic_sensor_YN}
                  />
                  <RadioBtn
                    title="대변기 버튼식/자동센서 물 내림 여부"
                    getCheck={getCheck}
                    name="t_dt_toilet_automatic_sensor_YN"
                    value={value.t_dt_toilet_automatic_sensor_YN}
                  />
                  <RadioBtn
                    title="세정장치"
                    getCheck={getCheck}
                    name="t_dt_cleandevice_YN"
                    value={value.t_dt_cleandevice_YN}
                  />
                </>
              ) : null}

              <View style={styles.img}>
                {value.t_dt_YN === "Y" ? (
                  <>
                    <TakePhoto
                      title="장애인 화장실"
                      name="p_t_dt_disabledToiletImg"
                      getImage={getImage}
                      value={value.p_t_dt_disabledToiletImg}
                    />
                    <TakePhoto
                      title="장애인 화장실 문"
                      name="p_t_dt_doortypeImg"
                      getImage={getImage}
                      value={value.p_t_dt_doortypeImg}
                    />
                    {value.t_dt_urinal_YN === "Y" ? (
                      <TakePhoto
                        title="소변기"
                        name="p_t_dt_urinaImg"
                        getImage={getImage}
                        value={value.p_t_dt_urinaImg}
                      />
                    ) : null}
                    {value.t_dt_toilet_YN === "Y" ? (
                      <TakePhoto
                        title="대변기"
                        name="p_t_dt_toiletImg"
                        getImage={getImage}
                        value={value.p_t_dt_toiletImg}
                      />
                    ) : null}
                    {value.t_dt_urinal_handle_YN === "Y" ? (
                      <TakePhoto
                        title="소변기 좌우 손잡이 설치"
                        name="p_t_dt_urinalHandleImg"
                        getImage={getImage}
                        value={value.p_t_dt_urinalHandleImg}
                      />
                    ) : null}
                    {value.t_dt_toilet_handle_YN === "Y" ? (
                      <TakePhoto
                        title="대변기 좌우 손잡이 설치"
                        name="p_t_dt_toiletHandleImg"
                        getImage={getImage}
                        value={value.p_t_dt_toiletHandleImg}
                      />
                    ) : null}
                    {value.t_dt_urinal_handle_YN === "Y" ? (
                      <TakePhoto
                        title="소변기 버튼식/자동센서 물 내림 여부"
                        name="p_t_dt_urinalautomaticeSensorImg"
                        getImage={getImage}
                        value={value.p_t_dt_urinalautomaticeSensorImg}
                      />
                    ) : null}
                    {value.t_dt_urinal_automatic_sensor_YN === "Y" ? (
                      <TakePhoto
                        title="대변기 버튼식/자동센서 물 내림 여부"
                        name="p_t_dt_toiletautomaticeSensorImg"
                        getImage={getImage}
                        value={value.p_t_dt_toiletautomaticeSensorImg}
                      />
                    ) : null}

                    <Input
                      title="소변기(좌~벽)"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_dt_urinal_left_width"
                      value={value.t_dt_urinal_left_width}
                    />

                    <Input
                      title="소변기(우~벽)"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_dt_urinal_right_width"
                      value={value.t_dt_urinal_right_width}
                    />

                    <Input
                      title="소변기(~벽)"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_dt_urinal_back_width"
                      value={value.t_dt_urinal_back_width}
                    />
                    <Input
                      title="소변기(~출입문)"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_dt_urinal_front_width"
                      value={value.t_dt_urinal_front_width}
                    />
                    <Input
                      title="대변기(좌~벽)"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_dt_left_width"
                      value={value.t_dt_left_width}
                    />
                    <Input
                      title="대변기(우~벽)"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_dt_right_width"
                      value={value.t_dt_right_width}
                    />

                    <Input
                      title="대변기(~벽)"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_dt_back_width"
                      value={value.t_dt_back_width}
                    />
                    <Input
                      title="대변기(~출입문)"
                      getText={getText}
                      keyboardType={"numeric"}
                      name="t_dt_front_width"
                      value={value.t_dt_front_width}
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
