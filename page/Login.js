import { useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

import { styles } from "../assets/styles/main.js";
import { color } from "../assets/styles/color.js";
import logo from "../assets/img/gp_logo.png";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLoaction] = useState(null);
  const [idfocus, setIdFocus] = useState(false);
  const [pwfocus, setPwFocus] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleOnSubmit = () => {
    if (id === "" || password === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요");
    }
  };
  const data = [
    { label: "대구", value: "대구" },
    { label: "포항", value: "포항" },
  ];

  return (
    <>
      <View style={styles.login}>
        <Text style={styles.login_title}>User Login</Text>
        <View style={styles.location}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            data={data}
            search={false}
            labelField="label"
            valueField="location"
            placeholder="지역을 선택하세요"
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
          {/* <BouncyCheckbox
            size={15}
            fillColor="#659ec7"
            onPress={() => setIsChecked(!isChecked)}
            text="자동 로그인"
            iconStyle={{ borderRadius: 0 }}
            textStyle={{
              textDecorationLine: "none",
            }}
          /> */}
        </View>
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
