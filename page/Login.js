import { useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";

import { styles } from "../assets/styles/main.js";
import { color } from "../assets/styles/color.js";
import logo from "../assets/img/gp_logo.png";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLoaction] = useState("");

  const [idfocus, setIdFocus] = useState(false);
  const [pwfocus, setPwFocus] = useState(false);
  const [btnfocus, setBtnfocus] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  const Location_Daegu = () => {
    setBtnfocus(false);
    setLoaction("대구");
  };

  const Location_Pohang = () => {
    setBtnfocus(true);
    setLoaction("포항");
  };

  const handleOnSubmit = () => {
    if (id === "" || password === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요");
    }
  };

  return (
    <>
      <View style={styles.login}>
        <Text style={styles.login_title}>User Login</Text>
        <View style={styles.location}>
          <TouchableOpacity
            onPress={Location_Daegu}
            style={{
              ...styles.location_btn,
              backgroundColor: btnfocus ? color.gray : color.blue,
            }}
          >
            <Text
              style={{
                ...styles.location_btn_title,
                color: !btnfocus ? "white" : color.blue,
              }}
            >
              대구
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Location_Pohang}
            style={{
              ...styles.location_btn,
              backgroundColor: !btnfocus ? color.gray : color.blue,
            }}
          >
            <Text
              style={{
                ...styles.location_btn_title,
                color: !btnfocus ? color.blue : "white",
              }}
            >
              포항
            </Text>
          </TouchableOpacity>
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
        <View></View>
        <TouchableOpacity onPress={handleOnSubmit} style={styles.submit_btn}>
          <Text style={styles.submit_btn_title}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logo}>
        <Image source={logo} style={{ width: 200, height: 55 }} />
      </View>
    </>
  );
}
