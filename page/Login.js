import { useState, useEffect } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { styles } from "../assets/styles/login.js";
import logo from "../assets/img/gp_logo.png";

export default function Login({ navigation }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLoaction] = useState(null);
  const [idfocus, setIdFocus] = useState(false);
  const [pwfocus, setPwFocus] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [loggin, setLoggin] = useState(false);

  const data = [
    { label: "대구", value: 3001 },
    { label: "포항", value: 3002 },
  ];
  useEffect(() => {
    // AsyncStorage.getItem("User", (err, result) => {
    //   if (result) {
    //     console.log(result);
    //   }
    // }); //자동 로그인 시 추후에 아이디 비밀번호 확인하는 과정으로 필요함
    AsyncStorage.getItem("IsChecked", (err, result) => {
      if (result) {
        let AutoLog = JSON.parse(result);
        if (AutoLog.isChecked) {
          navigation.push("Home");
        }
      }
    });
  }, []);

  const handleOnSubmit = () => {
    if (id === "" || password === "") {
      Alert.alert("알림", "아이디와 비밀번호를 모두 입력해주세요");
    } else if (location === null) {
      Alert.alert("알림", "지역을 선택해주세요");
    } else {
      axios
        .post("http://gw.tousflux.com:10307/PublicDataAppService.svc/api/login", {
          regionCode: location,
          userId: id,
          userPw: password,
        })
        .then((res) => {
          if (res.data === "") {
            Alert.alert("아이디와 비밀번호를 다시 확인해주세요");
          } else {
            setLoggin(true);
            AsyncStorage.setItem("User", JSON.stringify(JSON.parse(res.data)));
            AsyncStorage.setItem("IsChecked", JSON.stringify({ isChecked: isChecked }));
            AsyncStorage.setItem("Loggin", JSON.stringify({ loggin: loggin }));
            navigation.push("Home");
          }
        })
        .catch((err) => Alert.alert("로그인에 실패했습니다. 다시 시도해주세요."));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Text style={styles.login_title}>User Login</Text>
        <View style={styles.location}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            data={data}
            maxHeight={300}
            search={false}
            labelField="label"
            valueField="value"
            placeholder="지역을 선택하세요"
            value={location}
            onChange={(item) => {
              setLoaction(item.value);
            }}
            renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="enviromento" size={15} />}
          />
        </View>
        <View style={styles.userinfo}>
          <TextInput
            name="id"
            value={id}
            placeholder="아이디"
            onChangeText={(text) => setId(text)}
            onFocus={() => {
              setIdFocus(true);
              setPwFocus(false);
            }}
            onBlur={() => {
              setIdFocus(false);
              setPwFocus(true);
            }}
            style={idfocus ? styles.input_focus : styles.input}
          ></TextInput>
          <TextInput
            name="id"
            value={password}
            placeholder="비밀번호"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => {
              setIdFocus(false);
              setPwFocus(true);
            }}
            onBlur={() => {
              setIdFocus(true);
              setPwFocus(false);
            }}
            style={pwfocus ? styles.input_focus : styles.input}
          ></TextInput>
        </View>
        <View style={styles.checkbox}>
          <BouncyCheckbox
            size={15}
            fillColor="#00acb1"
            onPress={() => setIsChecked(!isChecked)}
            text="자동 로그인"
            iconStyle={{ borderRadius: 0 }}
            textStyle={{
              textDecorationLine: "none",
            }}
          />
        </View>
        <TouchableOpacity onPress={handleOnSubmit} style={styles.submit_btn}>
          <Text style={styles.submit_btn_title}>로그인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logo}>
        <Image source={logo} style={{ width: 150, height: 40 }} />
      </View>
    </View>
  );
}
