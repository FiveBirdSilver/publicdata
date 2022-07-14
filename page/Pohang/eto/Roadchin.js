import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import axios from "axios";

import { styles } from "../../../assets/styles/add";
import Input from "../../component/Input";

export default function Elevator({ route, navigation }) {
  const { listName, listKey, teamKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [value, setValue] = useState([]);

  useEffect(() => {
    axios
      .post(`${API}/api/pohang/eto/getroadchin`, {
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
    if (value.eto_rh_YN === "Y" && (value.eto_rh_height === "" || value.eto_rh_width === ""))
      Alert.alert("모든 항목을 입력해주세요.");
    else if (value.cr_rh_YN === "Y" && (value.eto_rh_height === 0 || value.eto_rh_width === 0))
      Alert.alert("모든 항목을 입력해주세요.");
    else
      axios
        .post(`${API}/api/pohang/eto/setroadchin`, {
          team_skey: teamKey,
          list_skey: listKey,
          eto_rh_YN: value.eto_rh_YN,
          eto_rh_height: value.eto_rh_height,
          eto_rh_width: value.eto_rh_width,
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

  const onValueChange = (val) => {
    if (val === "Y") setValue((prev) => ({ ...prev, eto_rh_YN: val }));
    else if (val === "N")
      setValue((value) => ({
        ...value,
        eto_rh_YN: val,
        eto_rh_height: 0,
        eto_rh_width: 0,
      }));
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
                <Text style={styles.add_subtitle}>턱 유무</Text>
                <RadioButton.Group
                  onValueChange={(value) => onValueChange(value)}
                  value={value.eto_rh_YN}
                  style={styles.yesorno}
                >
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
              {value.eto_rh_YN === "Y" ? (
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Input
                    title="높이"
                    getText={getText}
                    name="eto_rh_height"
                    value={value.eto_rh_height}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 13, right: 10 }}>cm</Text>

                  <Input
                    title="폭"
                    getText={getText}
                    name="eto_rh_width"
                    value={value.eto_rh_width}
                    keyboardType={"numeric"}
                  />
                  <Text style={{ position: "absolute", top: 63, right: 10 }}>cm</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
