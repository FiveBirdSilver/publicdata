import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import Header from "../component/Header";
import { styles } from "../../assets/styles/area";

export default function Door({ route, navigation }) {
  const { listName, listkey } = route.params;

  const company = {
    label: ["기본정보", "출입문", "출입구", "출입구 경사로", "내부", "외부"],
    value: ["Basic_D", "Door_D", "Doorway_D", "Ramp_D", "Inside_D", "Outside_D"],
  };
  const toilet = {
    label: ["종류", "출입문", "출입구", "경사로", "세면대", "손잡이 위치", "변기 등받이"],
    value: ["Type_D", "TDoor_D", "TDoorway_D", "TRamp_D", "Washstand_D", "Handle_D", "Backrest_D"],
  };
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Header title="데이터 수집" subtitle="데이터 만들기" />
      </View>
      <View style={styles.area}>
        <Text style={styles.area_title}>{listName}</Text>
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.area_container}>
          <Text style={styles.sub_title}>업체</Text>
          <View style={styles.area_wrapper}>
            {company.label.map((i, index) => (
              <TouchableOpacity
                key={i}
                style={styles.area_btn}
                onPress={() =>
                  navigation.push(`${company.value[index]}`, {
                    item: i,
                  })
                }
              >
                <Text style={styles.area_btn_title}>{i}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.area_container}>
          <Text style={styles.sub_title}>화장실</Text>
          <View style={styles.area_wrapper}>
            {toilet.label.map((i, index) => (
              <TouchableOpacity
                key={i}
                style={styles.area_btn}
                onPress={() =>
                  navigation.push(`${toilet.value[index]}`, {
                    item: i,
                  })
                }
              >
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
