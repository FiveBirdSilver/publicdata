import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from "react-native";
import { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import TakePhoto from "../../component/TakePhoto";
import { color } from "../../../assets/styles/color";
import uploadImgToGcs from "../../component/util";

import Input from "../../component/Input";
import { styles } from "../../../assets/styles/add";

export default function Basic({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;

  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [imageLength, setImageLength] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/essential/getbasic`, {
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

  const handleOnSubmit = () => {
    if (
      value.e_b_touristDestination === null ||
      value.e_b_address === null ||
      value.e_b_fee === null ||
      value.e_b_holiday === null ||
      value.e_b_openingHours === null ||
      value.e_b_travelTime === null ||
      value.e_b_touristDestination === "" ||
      value.e_b_address === "" ||
      value.e_b_fee === "" ||
      value.e_b_holiday === "" ||
      value.e_b_openingHours === "" ||
      value.e_b_travelTime === "" ||
      value.e_b_discount === null ||
      value.e_b_discount === ""
    ) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (imageLength === 0) {
      Alert.alert("필수 사진을 모두 추가해 주세요.");
    } else {
      setModalVisible(true);
      uploadImgToGcs(image, regionKey, region, listKey, dataCollection, data).then((result) => {
        console.log("실행");
        axios
          .post(`${API}/api/pohang/essential/setbasic`, {
            team_skey: teamKey,
            list_skey: listKey,
            e_b_touristDestination: value.e_b_touristDestination,
            e_b_address: value.e_b_address,
            e_b_travelTime: value.e_b_travelTime,
            e_b_fee: value.e_b_fee,
            e_b_openingHours: value.e_b_openingHours,
            e_b_holiday: value.e_b_holiday,
            e_b_discount: value.e_b_discount,
          })
          .then((res) => {
            const response = JSON.parse(res.data);
            if (response.result === 1) {
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
      });
    }
  };
  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <View style={styles.add_title_container}>
          <TouchableOpacity style={styles.add_title_wrapper}>
            <View style={styles.icon_wrap}>
              <TouchableOpacity style={styles.footer_title} onPress={() => navigation.goBack()}>
                <AntDesign style={styles.icon} color="#00acb1" name="back" size={30} />
              </TouchableOpacity>
            </View>
            <Text>뒤로</Text>
          </TouchableOpacity>
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
                title="관광지명"
                getText={getText}
                name="e_b_touristDestination"
                value={value.e_b_touristDestination}
              />
              <Input title="주소" getText={getText} name="e_b_address" value={value.e_b_address} />
              <Input
                title="이동소요시간"
                getText={getText}
                name="e_b_travelTime"
                value={value.e_b_travelTime}
                placeholder="EX. 1시간 30분 => 1.5"
                keyboardType={"numeric"}
              />

              <Input
                title="관람료"
                getText={getText}
                name="e_b_fee"
                value={value.e_b_fee}
                placeholder="EX. 성인 15,000원"
              />
              <Input
                title="할인 정보"
                getText={getText}
                name="e_b_discount"
                value={value.e_b_discount}
                placeholder="EX. 장애인 00% 군인 00%"
              />
              <Input
                title="영업시간"
                getText={getText}
                name="e_b_openingHours"
                value={value.e_b_openingHours}
                placeholder="EX. 09:00 ~ 18:00"
              />
              <Input
                title="휴무일"
                getText={getText}
                name="e_b_holiday"
                value={value.e_b_holiday}
                placeholder="EX. 화요일"
              />
              <View style={styles.img}>
                <TakePhoto
                  title="관광지"
                  name="p_e_basic_touristDestinationImg"
                  getImage={getImage}
                  value={value.p_e_basic_touristDestinationImg}
                />
                <TakePhoto title="관람료" name="p_e_basic_feeImg" getImage={getImage} value={value.p_e_basic_feeImg} />
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
