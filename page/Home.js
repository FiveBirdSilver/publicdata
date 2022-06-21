import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../assets/styles/home";

export default function Home() {
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("User", (err, result) => {
      setUserInfo(JSON.parse(result));
    });
  }, []);
  const item = ["항목 1", "항목 2", "항목 3"];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HOME</Text>
        <Text style={styles.subtitle}>사용자 정보</Text>
      </View>
      <View style={styles.userinfo}>
        <View style={styles.userimg}>
          <AntDesign style={styles.icon} color="white" name="user" size={40} />
        </View>
        <View>
          <Text style={styles.userid}>{userInfo.id} 님(A123a)</Text>
          <Text style={styles.userloc}>지역 {userInfo.location}</Text>
        </View>
      </View>
      <View style={styles.today}>
        <Text style={styles.today_title}>오늘의 구역</Text>
      </View>
      <View style={styles.today_item}>
        {item.map((i) => (
          <Text style={styles.item_text} key={i}>
            {i}
          </Text>
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_container}>
          <View style={styles.icon_wrap}>
            <AntDesign style={styles.icon} color="#00acb1" name="home" size={30} />
          </View>
          <Text style={styles.footer_title}>홈</Text>
        </View>
        <View style={styles.footer_container}>
          <View style={styles.icon_wrap}>
            <AntDesign style={styles.icon} color="#00acb1" name="search1" size={30} />
          </View>
          <Text style={styles.footer_title}>수집</Text>
        </View>
        <View style={styles.footer_container}>
          <View style={styles.icon_wrap}>
            <AntDesign style={styles.icon} color="#00acb1" name="logout" size={30} />
          </View>
          <Text style={styles.footer_title}>로그아웃</Text>
        </View>
      </View>
    </View>
  );
}
