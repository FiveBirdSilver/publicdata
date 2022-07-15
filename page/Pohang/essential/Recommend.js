import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import Input from "../../component/Input";

import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";
import RadioBtn from "../../component/RadioBtn";

export default function Recommend({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [season, setSeason] = useState([]);
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [plus, setPlus] = useState("");
  const [arr, setArr] = useState(["]"]);

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
      .post(`${API}/api/pohang/essential/getrecommand`, {
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
        setPlus(response.picture.filter((i) => i.url !== null || "").length);
        // setArr({
        //   spring: obj.e_rc_season.includes(0),
        //   summer: obj.e_rc_season.includes(1),
        //   fall: obj.e_rc_season.includes(2),
        //   winter: obj.e_rc_season.includes(3),
        // });
      })
      .catch((err) => console.log(err));
  }, []);

  const DataSave = () => {
    setModalVisible(true);
    uploadImgToGcs(image, regionKey, region, listKey, dataCollection, data)
      .then((result) => {
        axios
          .post(`${API}/api/pohang/essential/setrecommand`, {
            team_skey: teamKey,
            list_skey: listKey,
            e_rc_course: value.e_rc_course,
            e_rc_season: season,
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
    if (value.e_rc_course === "" || value.e_rc_course === null || season.length === 0) {
      Alert.alert("모든 항목을 입력해 주세요.");
    } else DataSave();
  };

  const handleOnPlus = () => {
    setPlus(plus + 1);
    if (plus === 10) {
      Alert.alert("추천 코스 사진 추가는 최대 10개까지 가능합니다.");
      setPlus(value.picture.filter((i) => i.url !== null || "").length);
    }
  };
  const handleOnMinus = () => {
    setPlus(plus - 1);
  };

  const getText = (text) => {
    let arr = text.split(",");
    if (arr.length > 10) {
      Alert.alert("추천 코스 입력은 최대 10개까지 가능합니다.");
    } else
      setValue({
        ...value,
        e_rc_course: text,
      });
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
              <View style={styles.season}>
                <Text style={styles.season_title}>추천 계절</Text>
              </View>
              <Text style={styles.season_ps}>* 중복 선택 가능</Text>

              <View style={styles.season_container}>
                <BouncyCheckbox
                  size={15}
                  fillColor="#00acb1"
                  onPress={(v) =>
                    v
                      ? setSeason((prev) => {
                          return [...prev, 0];
                        })
                      : setSeason((prev) => {
                          return prev.filter((i) => i !== 0);
                        })
                  }
                  text="봄"
                  iconStyle={{ borderRadius: 0 }}
                  textStyle={{
                    textDecorationLine: "none",
                    color: "black",
                  }}
                  isChecked={arr && arr.includes("0") ? true : false}
                />
                <BouncyCheckbox
                  size={15}
                  fillColor="#00acb1"
                  onPress={(v) =>
                    v
                      ? setSeason((prev) => {
                          return [...prev, 1];
                        })
                      : setSeason((prev) => {
                          return prev.filter((i) => i !== 1);
                        })
                  }
                  text="여름"
                  iconStyle={{ borderRadius: 0 }}
                  textStyle={{
                    textDecorationLine: "none",
                    color: "black",
                  }}
                  isChecked={arr.includes("1") ? true : false}
                />
                <BouncyCheckbox
                  size={15}
                  fillColor="#00acb1"
                  onPress={(v) =>
                    v
                      ? setSeason((prev) => {
                          return [...prev, 2];
                        })
                      : setSeason((prev) => {
                          return prev.filter((i) => i !== 2);
                        })
                  }
                  text="가을"
                  iconStyle={{ borderRadius: 0 }}
                  textStyle={{
                    textDecorationLine: "none",
                    color: "black",
                  }}
                />
                <BouncyCheckbox
                  size={15}
                  fillColor="#00acb1"
                  onPress={(v) =>
                    v
                      ? setSeason((prev) => {
                          return [...prev, 3];
                        })
                      : setSeason((prev) => {
                          return prev.filter((i) => i !== 3);
                        })
                  }
                  text="겨울"
                  iconStyle={{ borderRadius: 0 }}
                  textStyle={{
                    textDecorationLine: "none",
                    color: "black",
                  }}
                />
              </View>

              <View style={styles.resubTitle}>
                <Text style={styles.add_subtitle}>추천 코스</Text>
                <TextInput
                  name={value}
                  onChangeText={(text) => getText(text)}
                  style={styles.reInput}
                  value={value.e_rc_course}
                  placeholder="추천 코스는 최대 10개까지 입력 가능합니다. ' , ' 로 구분해 주세요."
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={handleOnPlus} style={styles.reIcon}>
                  <AntDesign style={styles.icon} color="#00acb1" name="plus" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnMinus} style={styles.reIcon}>
                  <AntDesign style={styles.icon} color="#00acb1" name="minus" size={30} />
                </TouchableOpacity>
              </View>

              <View style={styles.img}>
                {plus === 1 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                  </>
                ) : plus === 2 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                    <TakePhoto title="추천 코스 2" name="p_e_rc_Img1" getImage={getImage} value={value.p_e_rc_Img1} />
                  </>
                ) : plus === 3 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                    <TakePhoto title="추천 코스 2" name="p_e_rc_Img1" getImage={getImage} value={value.p_e_rc_Img1} />
                    <TakePhoto title="추천 코스 3" name="p_e_rc_Img2" getImage={getImage} value={value.p_e_rc_Img2} />
                  </>
                ) : plus === 4 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                    <TakePhoto title="추천 코스 2" name="p_e_rc_Img1" getImage={getImage} value={value.p_e_rc_Img1} />
                    <TakePhoto title="추천 코스 3" name="p_e_rc_Img2" getImage={getImage} value={value.p_e_rc_Img2} />
                    <TakePhoto title="추천 코스 4" name="p_e_rc_Img3" getImage={getImage} value={value.p_e_rc_Img3} />
                  </>
                ) : plus === 5 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                    <TakePhoto title="추천 코스 2" name="p_e_rc_Img1" getImage={getImage} value={value.p_e_rc_Img1} />
                    <TakePhoto title="추천 코스 3" name="p_e_rc_Img2" getImage={getImage} value={value.p_e_rc_Img2} />
                    <TakePhoto title="추천 코스 4" name="p_e_rc_Img3" getImage={getImage} value={value.p_e_rc_Img3} />
                    <TakePhoto title="추천 코스 5" name="p_e_rc_Img4" getImage={getImage} value={value.p_e_rc_Img4} />
                  </>
                ) : plus === 6 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                    <TakePhoto title="추천 코스 2" name="p_e_rc_Img1" getImage={getImage} value={value.p_e_rc_Img1} />
                    <TakePhoto title="추천 코스 3" name="p_e_rc_Img2" getImage={getImage} value={value.p_e_rc_Img2} />
                    <TakePhoto title="추천 코스 4" name="p_e_rc_Img3" getImage={getImage} value={value.p_e_rc_Img3} />
                    <TakePhoto title="추천 코스 5" name="p_e_rc_Img4" getImage={getImage} value={value.p_e_rc_Img4} />
                    <TakePhoto title="추천 코스 6" name="p_e_rc_Img5" getImage={getImage} value={value.p_e_rc_Img5} />
                  </>
                ) : plus === 7 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                    <TakePhoto title="추천 코스 2" name="p_e_rc_Img1" getImage={getImage} value={value.p_e_rc_Img1} />
                    <TakePhoto title="추천 코스 3" name="p_e_rc_Img2" getImage={getImage} value={value.p_e_rc_Img2} />
                    <TakePhoto title="추천 코스 4" name="p_e_rc_Img3" getImage={getImage} value={value.p_e_rc_Img3} />
                    <TakePhoto title="추천 코스 5" name="p_e_rc_Img4" getImage={getImage} value={value.p_e_rc_Img4} />
                    <TakePhoto title="추천 코스 6" name="p_e_rc_Img5" getImage={getImage} value={value.p_e_rc_Img5} />
                    <TakePhoto title="추천 코스 7" name="p_e_rc_Img6" getImage={getImage} value={value.p_e_rc_Img6} />
                  </>
                ) : plus === 8 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                    <TakePhoto title="추천 코스 2" name="p_e_rc_Img1" getImage={getImage} value={value.p_e_rc_Img1} />
                    <TakePhoto title="추천 코스 3" name="p_e_rc_Img2" getImage={getImage} value={value.p_e_rc_Img2} />
                    <TakePhoto title="추천 코스 4" name="p_e_rc_Img3" getImage={getImage} value={value.p_e_rc_Img3} />
                    <TakePhoto title="추천 코스 5" name="p_e_rc_Img4" getImage={getImage} value={value.p_e_rc_Img4} />
                    <TakePhoto title="추천 코스 6" name="p_e_rc_Img5" getImage={getImage} value={value.p_e_rc_Img5} />
                    <TakePhoto title="추천 코스 7" name="p_e_rc_Img6" getImage={getImage} value={value.p_e_rc_Img6} />
                    <TakePhoto title="추천 코스 8" name="p_e_rc_Img7" getImage={getImage} value={value.p_e_rc_Img7} />
                  </>
                ) : plus === 9 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                    <TakePhoto title="추천 코스 2" name="p_e_rc_Img1" getImage={getImage} value={value.p_e_rc_Img1} />
                    <TakePhoto title="추천 코스 3" name="p_e_rc_Img2" getImage={getImage} value={value.p_e_rc_Img2} />
                    <TakePhoto title="추천 코스 4" name="p_e_rc_Img3" getImage={getImage} value={value.p_e_rc_Img3} />
                    <TakePhoto title="추천 코스 5" name="p_e_rc_Img4" getImage={getImage} value={value.p_e_rc_Img4} />
                    <TakePhoto title="추천 코스 6" name="p_e_rc_Img5" getImage={getImage} value={value.p_e_rc_Img5} />
                    <TakePhoto title="추천 코스 7" name="p_e_rc_Img6" getImage={getImage} value={value.p_e_rc_Img6} />
                    <TakePhoto title="추천 코스 8" name="p_e_rc_Img7" getImage={getImage} value={value.p_e_rc_Img7} />
                    <TakePhoto title="추천 코스 9" name="p_e_rc_Img8" getImage={getImage} value={value.p_e_rc_Img8} />
                  </>
                ) : plus === 10 ? (
                  <>
                    <TakePhoto title="추천 코스 1" name="p_e_rc_Img0" getImage={getImage} value={value.p_e_rc_Img0} />
                    <TakePhoto title="추천 코스 2" name="p_e_rc_Img1" getImage={getImage} value={value.p_e_rc_Img1} />
                    <TakePhoto title="추천 코스 3" name="p_e_rc_Img2" getImage={getImage} value={value.p_e_rc_Img2} />
                    <TakePhoto title="추천 코스 4" name="p_e_rc_Img3" getImage={getImage} value={value.p_e_rc_Img3} />
                    <TakePhoto title="추천 코스 5" name="p_e_rc_Img4" getImage={getImage} value={value.p_e_rc_Img4} />
                    <TakePhoto title="추천 코스 6" name="p_e_rc_Img5" getImage={getImage} value={value.p_e_rc_Img5} />
                    <TakePhoto title="추천 코스 7" name="p_e_rc_Img6" getImage={getImage} value={value.p_e_rc_Img6} />
                    <TakePhoto title="추천 코스 8" name="p_e_rc_Img7" getImage={getImage} value={value.p_e_rc_Img7} />
                    <TakePhoto title="추천 코스 9" name="p_e_rc_Img8" getImage={getImage} value={value.p_e_rc_Img8} />
                    <TakePhoto title="추천 코스 10" name="p_e_rc_Img9" getImage={getImage} value={value.p_e_rc_Img9} />
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
    </ScrollView>
  );
}
