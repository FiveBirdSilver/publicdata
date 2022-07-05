import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Input from "../../component/Input";
import { styles } from "../../../assets/styles/add";

export default function Basic({ route, navigation }) {
  const { listName, listKey } = route.params;
  const [value, setValue] = useState({});
  const [user, setUser] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("User", (err, result) => {
      if (result) {
        console.log(JSON.parse(result));
        setUser(JSON.parse(result));
      }
    });
  }, []);
  const getText = (text, name) => {
    setValue((value) => ({
      ...value,
      [name]: text,
    }));
  };
  const handleOnSubmit = () => {
    axios
      .post("http://gw.tousflux.com:10307/PublicDataAppService.svc/api/pohang/essential/setbasic", {
        team_skey: user.team_skey,
        list_skey: listKey,
        e_b_touristDestination: value.name,
        e_b_address: value.address,
        e_b_travelTime: value.time,
        e_b_fee: value.price,
        e_b_openingHours: value.hours,
        e_b_holiday: value.close,
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
              <Input title="관광지명" getText={getText} name="name" />
              <Input title="주소" getText={getText} name="address" />
              <Input
                title="이동소요시간"
                getText={getText}
                name="time"
                placeholder="숫자만 입력해주세요 (EX. 1시간 30분 => 1.5)"
              />
              <Input
                title="관람료"
                getText={getText}
                name="price"
                placeholder="숫자만 입력해주세요 (EX. 15,000원 => 15000)"
              />
              <Input title="영업시간" getText={getText} name="hours" placeholder="EX. 09:00 ~ 18:00" />
              <Input title="휴무일" getText={getText} name="close" placeholder="EX. 화요일" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
