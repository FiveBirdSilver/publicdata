import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../assets/styles/home";
import Header from "../page/component/Header";

export default function Home({ navigation }) {
  const [userInfo, setUserInfo] = useState("");

  const [isChecked, setIsChecked] = useState(null);

  const item = ["항목 1", "항목 2", "항목 3", "항목 4", "항목 5", "항목 6", "항목 7", "항목 8", "항목 9"];

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
    Alert.alert("알림", "로그아웃 하시겠습니까?", [
      {
        text: "예",
        onPress: () => {
          AsyncStorage.setItem("IsChecked", JSON.stringify({ isChecked: false }));
          navigation.push("Login");
        },
      },
      {
        text: "아니오",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Header title="Home" subtitle="사용자정보" />
        <View style={styles.logout}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title} onPress={handleOnLogOut}>
              <AntDesign style={styles.icon} color="#00acb1" name="logout" size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.logout_title}>로그아웃</Text>
        </View>
      </View>
      <View style={styles.userinfo}>
        <View style={styles.userimg}>
          <AntDesign style={styles.icon} color="white" name="user" size={50} />
        </View>
        <View>
          <Text style={styles.userid}>A001</Text>
          <Text style={styles.userloc}>지역 {userInfo.location}</Text>
        </View>
      </View>
      <View style={styles.today}>
        <Text style={styles.today_title}>오늘의 구역</Text>
      </View>
      <View style={styles.today_item}>
        {item.map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              userInfo.location === 3002
                ? navigation.push("Area_P", {
                    area: i,
                  })
                : navigation.push("Area_D", {
                    area: i,
                  });
            }}
          >
            <Text style={styles.today_item_title}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View style={styles.footer}>
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
      </View> */}
    </View>
  );
}
