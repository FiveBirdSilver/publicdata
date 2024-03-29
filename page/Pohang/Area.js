import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";

import { styles } from "../../assets/styles/area";
import Header from "../component/Header";

export default function Area({ route, navigation }) {
  const { listName, listKey, teamKey, region, regionKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [complete, setComplete] = useState([]);
  const [join, setJoin] = useState([]);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios
      .post(`${API}/api/area`, {
        org_skey: regionKey,
        list_skey: listKey,
      })
      .then((res) => {
        const Response = JSON.parse(res.data);
        setComplete(Response);
        const TmpJoin = Response.status_list.coreroute
          .map((i) => i.status)
          .concat(Response.status_list.coreroute.map((i) => i.status))
          .concat(Response.status_list.eto.map((i) => i.status))
          .concat(Response.status_list.park.map((i) => i.status))
          .concat(Response.status_list.toilet.map((i) => i.status));
        setJoin(TmpJoin);
        if (TmpJoin.filter((i) => i === "N").length === 0) {
          setModalVisible(true);
        }
      });
  }, [isFocused]);

  const handleOnSubmit = () => {
    if (join.filter((i) => i === "N").length !== 0) {
      Alert.alert("미수집 항목이 존재합니다. 모든 수집 완료 후 저장해주세요.");
    } else
      axios
        .post(`${API}/api/completion`, {
          team_skey: teamKey,
          org_skey: regionKey,
          list_skey: listKey,
        })
        .then((res) => {
          if (JSON.parse(res.data).result === 1) {
            Alert.alert("저장되었습니다.");
          } else Alert.alert("저장에 실패했습니다. 다시 시도해주세요.");
        });
  };

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
    depth: ["basic", "rc", "dog", "ad", "ep", "g", "af", "tl"],
  };

  const flow = {
    label: ["보행로", "기타", "계단", "경사로", "턱", "승강기"],
    value: ["Footpath_P", "ETC_P", "Stairs_P", "Runway_P", "Roadchin_P", "Elevator_P"],
    depth: ["f", "etc", "s", "r", "rh", "ev"],
  };
  const park = {
    label: ["기본정보", "주차구역", "보행로"],
    value: ["ParkBasic_P", "ParkingArea_P", "ParkFootpath_P"],
    depth: ["basic", "pa", "f"],
  };
  const entry = {
    label: ["기본정보", "계단", "경사로", "승강기", "턱"],
    value: ["EtoBasic_P", "EtoStairs_P", "EtoRunway_P", "EtoElevator_P", "EtoRoadchin_P"],
    depth: ["basic", "s", "r", "ev", "rh"],
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
      "장애인 화장실",
      "편의시설",
    ],
    value: [
      "TBasic_P",
      "Entrance_P",
      "EntranceDoorWay_P",
      "InteriorEntrance_P",
      "Washstand_P",
      "Urinal_P",
      "Toilet_P",
      "DisabledToilet_P",
      "Facilities_P",
    ],
    depth: ["basic", "er", "ed", "ie", "w", "u", "t", "dt", "fc"],
  };
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Header title="데이터 수집" subtitle="데이터 만들기" />
        <View style={{ alignItems: "center" }}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title} onPress={() => handleOnSubmit()}>
              <AntDesign style={styles.icon} color="orange" name="upload" size={30} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 16 }}>저장</Text>
        </View>
      </View>
      <View>
        {join.filter((i) => i === "N").length === 0 ? (
          <Text style={styles.completeAlert}>
            🚨 모든 항목이 수집되었습니다. 위의 저장 버튼을 눌러 완료해 주세요. 🚨
          </Text>
        ) : null}
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
                style={
                  complete.length !== 0
                    ? complete.status_list.essential.map((i) => i.status)[index] === "Y"
                      ? styles.area_btn_complete
                      : styles.area_btn
                    : styles.area_btn
                }
                onPress={() =>
                  navigation.push(`${essential.value[index]}`, {
                    listName: i,
                    listKey: listKey,
                    teamKey: teamKey,
                    region: region,
                    regionKey: regionKey,
                    dataCollection: "e",
                    data: essential.depth[index],
                  })
                }
              >
                <Text
                  style={
                    complete.length !== 0
                      ? complete.status_list.essential.map((i) => i.status)[index] === "Y"
                        ? styles.area_btn_title_complete
                        : styles.area_btn_title
                      : styles.area_btn_title
                  }
                >
                  {i}
                </Text>
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
                style={
                  complete.length !== 0
                    ? complete.status_list.coreroute.map((i) => i.status)[index] === "Y"
                      ? styles.area_btn_complete
                      : styles.area_btn
                    : styles.area_btn
                }
                onPress={() =>
                  navigation.push(`${flow.value[index]}`, {
                    listName: i,
                    listKey: listKey,
                    teamKey: teamKey,
                    region: region,
                    regionKey: regionKey,
                    dataCollection: "cr",
                    data: flow.depth[index],
                  })
                }
              >
                <Text
                  style={
                    complete.length !== 0
                      ? complete.status_list.coreroute.map((i) => i.status)[index] === "Y"
                        ? styles.area_btn_title_complete
                        : styles.area_btn_title
                      : styles.area_btn_title
                  }
                >
                  {i}
                </Text>
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
                style={
                  complete.length !== 0
                    ? complete.status_list.park.map((i) => i.status)[index] === "Y"
                      ? styles.area_btn_complete
                      : styles.area_btn
                    : styles.area_btn
                }
                onPress={() =>
                  navigation.push(`${park.value[index]}`, {
                    listName: i,
                    listKey: listKey,
                    teamKey: teamKey,
                    region: region,
                    regionKey: regionKey,
                    dataCollection: "p",
                    data: park.depth[index],
                  })
                }
              >
                <Text
                  style={
                    complete.length !== 0
                      ? complete.status_list.park.map((i) => i.status)[index] === "Y"
                        ? styles.area_btn_title_complete
                        : styles.area_btn_title
                      : styles.area_btn_title
                  }
                >
                  {i}
                </Text>
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
                style={
                  complete.length !== 0
                    ? complete.status_list.eto.map((i) => i.status)[index] === "Y"
                      ? styles.area_btn_complete
                      : styles.area_btn
                    : styles.area_btn
                }
                onPress={() =>
                  navigation.push(`${entry.value[index]}`, {
                    listName: i,
                    listKey: listKey,
                    teamKey: teamKey,
                    region: region,
                    regionKey: regionKey,
                    dataCollection: "eto",
                    data: entry.depth[index],
                  })
                }
              >
                <Text
                  style={
                    complete.length !== 0
                      ? complete.status_list.eto.map((i) => i.status)[index] === "Y"
                        ? styles.area_btn_title_complete
                        : styles.area_btn_title
                      : styles.area_btn_title
                  }
                >
                  {i}
                </Text>
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
                style={
                  complete.length !== 0
                    ? complete.status_list.toilet.map((i) => i.status)[index] === "Y"
                      ? styles.area_btn_complete
                      : styles.area_btn
                    : styles.area_btn
                }
                onPress={() =>
                  navigation.push(`${toilet.value[index]}`, {
                    listName: i,
                    listKey: listKey,
                    teamKey: teamKey,
                    region: region,
                    regionKey: regionKey,
                    dataCollection: "t",
                    data: toilet.depth[index],
                  })
                }
              >
                <Text
                  style={
                    complete.length !== 0
                      ? complete.status_list.toilet.map((i) => i.status)[index] === "Y"
                        ? styles.area_btn_title_complete
                        : styles.area_btn_title
                      : styles.area_btn_title
                  }
                >
                  {i}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
