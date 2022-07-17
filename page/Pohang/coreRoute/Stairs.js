import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import { color } from "../../../assets/styles/color";
import Input from "../../component/Input";

import TakePhoto from "../../component/TakePhoto";
import uploadImgToGcs from "../../component/util";
import RadioBtn from "../../component/RadioBtn";

export default function Staris({ route, navigation }) {
  const { listName, listKey, region, regionKey, dataCollection, data, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState([]);

  const getCheck = (val, name) => {
    if (name === "cr_s_YN" && val === "N") {
      setValue((value) => ({
        ...value,
        cr_s_YN: "N",
        cr_s_handle_YN: "N",
        cr_s_handle_braille_YN: "N",
        cr_s_dotblock_YN: "N",
        cr_s_count: 0,
        cr_s_width: 0,
        cr_s_height: 0,
        cr_s_handle_structure: 2,
      }));
    } else
      setValue((value) => ({
        ...value,
        [name]: val,
      }));
  };

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/coreroute/getstairs`, {
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
          .post(`${API}/api/pohang/coreroute/setstairs`, {
            team_skey: teamKey,
            list_skey: listKey,
            cr_s_YN: value.cr_s_YN,
            cr_s_handle_YN: value.cr_s_handle_YN,
            cr_s_handle_braille_YN: value.cr_s_handle_braille_YN,
            cr_s_dotblock_YN: value.cr_s_dotblock_YN,
            cr_s_count: value.cr_s_count,
            cr_s_width: value.cr_s_width,
            cr_s_height: value.cr_s_height,
            cr_s_handle_structure: value.cr_s_handle_structure,
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
    if (value.cr_s_YN === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else if (
      (value.cr_s_YN === "Y" && value.cr_s_handle_YN === null) ||
      (value.cr_s_YN === "Y" && value.cr_s_handle_braille_YN === null) ||
      (value.cr_s_YN === "Y" && value.cr_s_dotblock_YN === null) ||
      (value.cr_s_YN === "Y" && value.cr_s_count === null) ||
      (value.cr_s_YN === "Y" && value.cr_s_count === 0) ||
      (value.cr_s_YN === "Y" && value.cr_s_count === "") ||
      (value.cr_s_YN === "Y" && value.cr_s_width === null) ||
      (value.cr_s_YN === "Y" && value.cr_s_width === 0) ||
      (value.cr_s_YN === "Y" && value.cr_s_width === "") ||
      (value.cr_s_YN === "Y" && value.cr_s_height === null) ||
      (value.cr_s_YN === "Y" && value.cr_s_height === 0) ||
      (value.cr_s_YN === "Y" && value.cr_s_height === "") ||
      (value.cr_s_YN === "Y" && value.cr_s_handle_structure === null)
    ) {
      Alert.alert("모든 항목을 입력해 주세요.");
    } else if (value.cr_s_YN === "Y" && imageLength !== 4) {
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
                title="계단 유무"
                getCheck={getCheck}
                name="cr_s_YN"
                value={value.cr_s_YN}
                yes="있다"
                no="없다"
              />
              {value.cr_s_YN === "Y" ? (
                <>
                  <RadioBtn
                    title="계단 손잡이 유무"
                    getCheck={getCheck}
                    name="cr_s_handle_YN"
                    value={value.cr_s_handle_YN}
                  />

                  <RadioBtn
                    title="계단 손잡이 점자 유무(시작과 끝)"
                    getCheck={getCheck}
                    name="cr_s_handle_braille_YN"
                    value={value.cr_s_handle_braille_YN}
                  />
                  <RadioBtn
                    title="계단 상하부 점형 블록 설치 유무"
                    getCheck={getCheck}
                    name="cr_s_dotblock_YN"
                    value={value.cr_s_dotblock_YN}
                  />
                </>
              ) : null}
              <View style={styles.img}>
                {value.cr_s_YN === "Y" ? (
                  <>
                    <TakePhoto
                      title="계단"
                      name="p_cr_s_stairsImg"
                      getImage={getImage}
                      value={value.p_cr_s_stairsImg}
                    />
                    <TakePhoto
                      title="계단 손잡이"
                      name="p_cr_s_handleImg"
                      getImage={getImage}
                      value={value.p_cr_s_handleImg}
                    />
                    <TakePhoto
                      title="계단 손잡이 점자"
                      name="p_cr_s_handleBrailleImg"
                      getImage={getImage}
                      value={value.p_cr_s_handleBrailleImg}
                    />
                    <TakePhoto
                      title="계단 상하부 점형 블록 설치"
                      name="p_cr_s_dotBlockImg"
                      getImage={getImage}
                      value={value.p_cr_s_dotBlockImg}
                    />
                  </>
                ) : null}
              </View>
              {value.cr_s_YN === "Y" ? (
                <>
                  <View
                    style={{
                      position: "relative",
                    }}
                  >
                    <Input
                      title="계단 개수"
                      getText={getText}
                      name="cr_s_count"
                      value={value.cr_s_count}
                      keyboardType={"numeric"}
                    />
                    <Text style={{ position: "absolute", top: 13, right: 10 }}>개</Text>
                    <Input
                      title="계단 폭"
                      getText={getText}
                      name="cr_s_width"
                      value={value.cr_s_width}
                      keyboardType={"numeric"}
                    />
                    <Text style={{ position: "absolute", top: 63, right: 10 }}>cm</Text>

                    <Input
                      title="계단 높이"
                      getText={getText}
                      name="cr_s_height"
                      value={value.cr_s_height}
                      keyboardType={"numeric"}
                    />
                    <Text style={{ position: "absolute", top: 113, right: 10 }}>cm</Text>
                  </View>

                  <View style={styles.add_container}>
                    <Text style={styles.add_subtitle}>계단 손잡이 형태(양 옆, 한쪽)</Text>
                    <RadioButton.Group
                      onValueChange={(v) =>
                        setValue((prev) => {
                          return { ...prev, cr_s_handle_structure: v };
                        })
                      }
                      value={value.cr_s_handle_structure}
                      style={styles.yesorno}
                    >
                      <View style={styles.radio}>
                        <View style={styles.radio_wrap}>
                          <Text>양 옆</Text>
                          <RadioButton value={0} />
                        </View>
                        <View style={styles.radio_wrap}>
                          <Text>한 쪽</Text>
                          <RadioButton value={1} />
                        </View>
                        <View style={styles.radio_wrap}>
                          <Text>없다</Text>
                          <RadioButton value={2} />
                        </View>
                      </View>
                    </RadioButton.Group>
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
