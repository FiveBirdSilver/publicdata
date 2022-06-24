import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Header from "../../component/Header";
import { styles } from "../../assets/styles/area";

export default function Area({ route, navigation }) {
  const { area } = route.params;

  const essential = {
    label: ["기본정보", "추천", "보조견", "보조기기 대여유무", "체험 프로그램", "안내 가이드 유무", "보조시설 유무"],
    value: ["Basic_P", "Recommend_P", "ServiceDog_P", "Device_P", "Program_P", "Giude_P", "Facility_P"],
  };
  const flow = ["보행로", "기타", "계단", "경사로", "턱", "승강기", "보조시설 유무"];
  const park = ["기본정보", "주차구역", "보행로"];
  const entry = ["기본정보", "계단", "관광지 리플렛", "경사로", "승강기", "턱"];
  const toilet = [
    "기본정보",
    "입구 경사로",
    "외부 출입구",
    "내부 출입구 (대변기)",
    "세면대",
    "소변기 / 대변기",
    "편의시설",
    "장애인 화장실",
  ];

  return (
    <View style={styles.container}>
      <Header title="데이터 수집" subtitle="데이터 만들기" />
      <View style={styles.area}>
        <Text style={styles.area_title}>{area}</Text>
      </View>
      <ScrollView style={styles.scrollview}>
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
        <View style={styles.area_container}>
          <Text style={styles.sub_title}>주차장</Text>
          <View style={styles.area_wrapper}>
            {park.map((i) => (
              <TouchableOpacity key={i} style={styles.area_btn}>
                <Text style={styles.area_btn_title}>{i}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.area_container}>
          <Text style={styles.sub_title}>입구/매표소</Text>
          <View style={styles.area_wrapper}>
            {entry.map((i) => (
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
