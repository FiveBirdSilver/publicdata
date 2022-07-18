import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../assets/styles/home";
import Header from "../page/component/Header";

export default function Home({ navigation }) {
  const [userInfo, setUserInfo] = useState("");
  const [listSkey, setListSkey] = useState([]);

  const data = [
    { label: "대구", value: 3001 },
    { label: "포항", value: 3002 },
  ];

  useEffect(() => {
    AsyncStorage.getItem("User", (err, result) => {
      if (result) {
        setUserInfo(JSON.parse(result));
        setListSkey(JSON.parse(result).list.map((i) => i.list_skey));
      }
    });
    AsyncStorage.setItem("Loggin", JSON.stringify({ loggin: true }));
  }, []);

  const handleOnLogOut = () => {
    Alert.alert("알림", "로그아웃 하시겠습니까?", [
      {
        text: "예",
        onPress: () => {
          AsyncStorage.setItem("IsChecked", JSON.stringify({ isChecked: false }));
          AsyncStorage.setItem("Loggin", JSON.stringify({ loggin: false }));
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
        <TouchableOpacity onPress={handleOnLogOut} style={styles.logout}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title}>
              <AntDesign style={styles.icon} color="#00acb1" name="logout" size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.logout_title}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userinfo}>
        <View style={styles.userimg}>
          <AntDesign style={styles.icon} color="white" name="user" size={50} />
        </View>
        <View>
          <Text style={styles.userid}>{userInfo.team_skey}</Text>
          <Text style={styles.userloc}>
            지역 {data.filter((i) => i.value === userInfo.org_skey).map((v) => v.label)[0]}
          </Text>
        </View>
      </View>
      <View style={styles.today}>
        <Text style={styles.today_title}>오늘의 장소</Text>
        <ScrollView>
          <View style={styles.today_item}>
            {listSkey.length !== 0
              ? listSkey.map((i, index) => (
                  <TouchableOpacity
                    style={styles.home_btn}
                    key={i}
                    onPress={() => {
                      userInfo.org_skey === 3002
                        ? navigation.push("Area_P", {
                            listName: userInfo.list.filter((v) => v.list_skey === i)[0].list_name,
                            listKey: i,
                            teamKey: userInfo.team_skey,
                            region: "p",
                            regionKey: userInfo.org_skey,
                          })
                        : navigation.push("Area_D", {
                            listName: userInfo.list.filter((v) => v.list_skey === i)[0].list_name,
                            listKey: i,
                            teamKey: userInfo.team_skey,
                            region: "d",
                            regionKey: userInfo.org_skey,
                          });
                    }}
                  >
                    <Text style={styles.today_item_title}>
                      {userInfo.list.filter((v) => v.list_skey === i)[0].list_name}
                    </Text>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
