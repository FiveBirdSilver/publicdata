import { Text, View, TouchableOpacity, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import Header from "../component/Header";
import TodayArea from "../component/TodayArea";
import { styles } from "../assets/styles/home";

export default function Collection({ navigation }) {
  const handleGoHome = () => {
    navigation.push("Home");
  };
  return (
    <View style={styles.container}>
      <Header title="데이터 수집" subtitle="데이터 만들기" />
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
      </View>
    </View>
  );
}
