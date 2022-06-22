import { Text, View, TouchableOpacity, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import Header from "../component/Header";
import { styles } from "../assets/styles/home";

export default function Collection({ navigation }) {
  const item = ["항목 1", "항목 2", "항목 3"];

  const handleGoHome = () => {
    navigation.push("Home");
  };
  return (
    <View style={styles.container}>
      <Header title="데이터 수집" subtitle="데이터 만들기" />
      <View style={styles.today}>
        <Text style={styles.today_title}>오늘의 구역</Text>
      </View>
      <View style={styles.today_item}>
        {item.map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigation.push("Area", {
                area: i,
              })
            }
          >
            <Text style={styles.today_item_title}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_container}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title} onPress={handleGoHome}>
              <AntDesign style={styles.icon} color="#00acb1" name="home" size={30} />
            </TouchableOpacity>
          </View>
          <Text>홈</Text>
        </View>
      </View>
    </View>
  );
}
