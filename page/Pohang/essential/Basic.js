import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import Input from "../../component/Input";
import { styles } from "../../../assets/styles/add";

export default function Basic({ route, navigation }) {
  const { listName, listKey, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);
  const requiredValue = Object.values(value).filter((i) => i !== "");

  const Compare = [
    "e_b_touristDestination",
    "e_b_address",
    "e_b_travelTime",
    "e_b_fee",
    "e_b_openingHours",
    "e_b_holiday",
  ];

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/essential/getbasic`, {
        team_skey: teamKey,
        list_skey: listKey,
      })
      .then((res) => {
        setValue(JSON.parse(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const getText = (text, name) => {
    setValue((value) => ({
      ...value,
      [name]: text,
    }));
  };

  const handleOnSubmit = () => {
    if (requiredValue.length !== Compare.length) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else
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
                placeholder="EX. 15,000원 => 15000"
                keyboardType={"numeric"}
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
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
