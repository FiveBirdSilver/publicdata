import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import Header from "../component/Header";
import { styles } from "../../assets/styles/area";

export default function Area({ route, navigation }) {
  const { area } = route.params;

  const company = ["기본정보", "출입문", "출입구", "출입구 경사로", "내부", "외부"];
  const toilet = ["종류", "출입문", "출입구", "세면대", "손잡이 위치", "변기 등받이"];

  return (
    <View style={styles.container}>
      <Header title="데이터 수집" subtitle="데이터 만들기" />
      <View style={styles.area}>
        <Text style={styles.area_title}>{area}</Text>
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.area_container}>
          <Text style={styles.sub_title}>업체</Text>
          <View style={styles.area_wrapper}>
            {company.map((i) => (
              <TouchableOpacity key={i} style={styles.area_btn}>
                <Text style={styles.area_btn_title}>{i}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.area_container}>
          <Text style={styles.sub_title}>화장실</Text>
          <View style={styles.area_wrapper}>
            {toilet.map((i) => (
              <TouchableOpacity key={i} style={styles.area_btn}>
                <Text style={styles.area_btn_title}>{i}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}
