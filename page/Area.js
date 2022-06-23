import { Text, View, TouchableOpacity } from "react-native";
import Header from "../component/Header";
import { styles } from "../assets/styles/area";

export default function Area({ route, navigation }) {
  const { area } = route.params;
  // const essential = [
  //   {
  //     기본정보: "Basic_P",
  //     추천: "Recommend_P",
  //     보조견: "ServiceDog_P",
  //     "보조기기 대여유무": "Device_P",
  //     "체험 프로그램": "Program_P",
  //     "안내요원 유무": "Giude_P", // 수정 필요
  //     "보조시설 유무": "Facility_P",
  //   },
  // ];
  const essential = {
    label: ["기본정보", "추천", "보조견", "보조기기 대여유무", "체험 프로그램", "안내요원 유무", "보조시설 유무"],
    value: ["Basic_P", "Recommend_P", "ServiceDog_P", "Device_P", "Program_P", "Giude_P", "Facility_P"],
  };
  const flow = ["보행로", "기타", "계단", "경사로", "턱", "승강기", "보조시설 유무"];
  return (
    <View style={styles.container}>
      <Header title="데이터 수집" subtitle="데이터 만들기" />
      <View style={styles.area}>
        <Text style={styles.area_title}>{area}</Text>
      </View>
      <View style={styles.area_container}>
        <Text style={styles.sub_title}>필수항목</Text>
        <View style={styles.area_wrapper}>
          {essential.label.map((i, index) => (
            <TouchableOpacity
              key={i}
              style={styles.area_btn}
              onPress={() =>
                navigation.push(`${essential.value[index]}`, {
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
        <Text style={styles.sub_title}>핵심동선</Text>
        <View style={styles.area_wrapper}>
          {flow.map((i) => (
            <TouchableOpacity key={i} style={styles.area_btn}>
              <Text style={styles.area_btn_title}>{i}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}
