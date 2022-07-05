import { useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import { styles } from "../../assets/styles/area";
import Header from "../component/Header";

export default function Area({ route, navigation }) {
  const { listName, listKey } = route.params;
  // useEffect(() => {
  //   axios // 항목1의 키 값
  // },[])

  const essential = {
    label: [
      "기본정보",
      "추천",
      "보조견",
      "보조기기 대여유무",
      "체험 프로그램",
      "안내 가이드 유무",
      "보조시설 유무",
      "관광지 리플렛",
    ],
    value: ["Basic_P", "Recommend_P", "ServiceDog_P", "Ad_P", "Program_P", "Guide_P", "Facility_P", "Leaflet_P"],
    // color : [],
  };
  const flow = {
    label: ["보행로", "기타", "계단", "경사로", "턱", "승강기"],
    value: ["Footpath_P", "ETC_P", "Stairs_P", "Runway_P", "Roadchin_P", "Elevator_P"],
  };
  const park = {
    label: ["기본정보", "주차구역", "보행로"],
    value: ["ParkBasic_P", "ParkingArea_P", "ParkFootpath_P"],
  };
  const entry = {
    label: ["기본정보", "계단", "경사로", "턱", "승강기"],
    value: ["EtoBasic_P", "EtoStairs_P", "EtoRunway_P", "EtoRoadchin_P", "EtoElevator_P"],
  };

  const toilet = {
    label: [
      "기본정보",
      "입구 경사로",
      "외부 출입구",
      "내부 출입구 (대변기)",
      "세면대",
      "소변기",
      "대변기",
      "편의시설",
      "장애인 화장실",
    ],
    value: [
      "TBasic_P",
      "Entrance_P",
      "EntranceDoorWay_P",
      "InteriorEntrance_P",
      "Washstand_P",
      "Urinal_P",
      "Toilet_P",
      "Facilities_P",
      "DisabledToilet_P",
    ],
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
          <Text style={styles.sub_title}>필수항목</Text>
          <View style={styles.area_wrapper}>
            {essential.label.map((i, index) => (
              <TouchableOpacity
                key={i}
                style={styles.area_btn}
                onPress={() =>
                  navigation.push(`${essential.value[index]}`, {
                    listName: i,
                    listKey: listKey,
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
            {flow.label.map((i, index) => (
              <TouchableOpacity
                key={i}
                style={styles.area_btn}
                onPress={() =>
                  navigation.push(`${flow.value[index]}`, {
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
          <Text style={styles.sub_title}>주차장</Text>
          <View style={styles.area_wrapper}>
            {park.label.map((i, index) => (
              <TouchableOpacity
                key={i}
                style={styles.area_btn}
                onPress={() =>
                  navigation.push(`${park.value[index]}`, {
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
          <Text style={styles.sub_title}>입구/매표소</Text>
          <View style={styles.area_wrapper}>
            {entry.label.map((i, index) => (
              <TouchableOpacity
                key={i}
                style={styles.area_btn}
                onPress={() =>
                  navigation.push(`${entry.value[index]}`, {
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
