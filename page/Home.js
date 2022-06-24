import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../assets/styles/home";
import TodayArea from "../component/TodayArea";
import Header from "../component/Header";

export default function Home({ navigation }) {
  const [userInfo, setUserInfo] = useState("");
  const [isChecked, setIsChecked] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem("User", (err, result) => {
      if (result) {
        setUserInfo(JSON.parse(result));
      }
    });
    AsyncStorage.getItem("IsChecked", (err, result) => {
      if (result) {
        setIsChecked(JSON.parse(result));
      }
    });
  }, []);
  const handleOnLogOut = () => {
    Alert.alert("Alert", "로그아웃 하시겠습니까?", [
      {
        text: "YES",
        onPress: () => {
          AsyncStorage.setItem("IsChecked", JSON.stringify({ isChecked: false }));
          navigation.push("Login");
        },
      },
      {
        text: "NO",
        style: "cancel",
      },
    ]);
  };
  const handleGoHome = () => {
    navigation.push("Home");
  };
  const handleGoCollection = () => {
    navigation.push("Collection");
  };
  return (
    <View style={styles.container}>
      <Header title="Home" subtitle="사용자정보" />
      <View style={styles.userinfo}>
        <View style={styles.userimg}>
          <AntDesign style={styles.icon} color="white" name="user" size={40} />
        </View>
        <View>
          <Text style={styles.userid}>{userInfo.id} 님(A123a)</Text>
          <Text style={styles.userloc}>지역 {userInfo.location}</Text>
        </View>
      </View>
      <TodayArea />
      <View style={styles.footer}>
        <View style={styles.footer_container}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title} onPress={handleGoHome}>
              <AntDesign style={styles.icon} color="#00acb1" name="home" size={30} />
            </TouchableOpacity>
          </View>
          <Text>홈</Text>
        </View>
        <View style={styles.footer_container}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title} onPress={handleGoCollection}>
              <AntDesign style={styles.icon} color="#00acb1" name="search1" size={30} />
            </TouchableOpacity>
          </View>
          <Text>수집</Text>
        </View>
        <View style={styles.footer_container}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title} onPress={handleOnLogOut}>
              <AntDesign style={styles.icon} color="#00acb1" name="logout" size={30} />
            </TouchableOpacity>
          </View>
          <Text>로그아웃</Text>
        </View>
      </View>
    </View>
  );
}
