import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";

import { styles } from "../../../assets/styles/add";
import axios from "axios";

export default function ServiceDog({ route, navigation }) {
  const { listName, listKey, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState(null);

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/essential/getservicedog`, {
        team_skey: teamKey,
        list_skey: listKey,
      })
      .then((res) => {
        setValue(JSON.parse(res.data).e_servicedog_YN);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnSubmit = () => {
    if (value === null) {
      Alert.alert("모든 항목을 입력해주세요.");
    } else
      axios
        .post(`${API}/api/pohang/essential/setservicedog`, {
          team_skey: teamKey,
          list_skey: listKey,
          e_servicedog_YN: value,
        })
        .then((res) => {
          const response = JSON.parse(res.data);
          if (response.result === 1) {
            Alert.alert("저장되었습니다.");
            navigation.goBack();
          } else Alert.alert("저장에 실패했습니다. 다시 시도해주세요.");
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
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>보조견 출입 가능 여부</Text>
                <RadioButton.Group onValueChange={(v) => setValue(v)} value={value} style={styles.yesorno}>
                  <View style={styles.radio}>
                    <View style={styles.radio_wrap}>
                      <Text>있다</Text>
                      <RadioButton value="Y" />
                    </View>
                    <View style={styles.radio_wrap}>
                      <Text>없다</Text>
                      <RadioButton value="N" />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
