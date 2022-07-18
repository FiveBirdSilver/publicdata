import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

import Header from "../component/Header";
import { styles } from "../../assets/styles/area";

export default function Door({ route, navigation }) {
  const { listName, listKey, teamKey, region, regionKey } = route.params;
  const API = "http://gw.tousflux.com:10307/PublicDataAppService.svc";
  const [join, setJoin] = useState([]);
  const [complete, setComplete] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    axios
      .post(`${API}/api/area`, {
        org_skey: regionKey,
        list_skey: listKey,
      })
      .then((res) => {
        const Response = JSON.parse(res.data);
        setComplete(Response);
        const TmpJoin = Response.status_list.company
          .map((i) => i.status)
          .concat(Response.status_list.toilet.map((i) => i.status));
        setJoin(TmpJoin);
      });
  }, [isFocused]);

  const company = {
    label: ["기본정보", "출입문", "출입구", "출입구 경사로", "내부", "외부"],
    value: ["Basic_D", "Door_D", "Doorway_D", "Ramp_D", "Inside_D", "Outside_D"],
    depth: ["basic", "door", "dw", "dw_ramp", "in", "out"],
  };
  const toilet = {
    label: ["종류", "출입문", "출입구", "경사로", "세면대", "손잡이 위치", "변기 등받이"],
    value: ["Type_D", "TDoor_D", "TDoorway_D", "TRamp_D", "Washstand_D", "Handle_D", "Backrest_D"],
    depth: ["type", "door", "dw", "ramp", "basin", "h", "tb"],
  };
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
          <Text>저장</Text>
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
          <Text style={styles.sub_title}>업체</Text>
          <View style={styles.area_wrapper}>
            {company.label.map((i, index) => (
              <TouchableOpacity
                key={i}
                style={
                  complete.length !== 0
                    ? complete.status_list.company.map((i) => i.status)[index] === "Y"
                      ? styles.area_btn_complete
                      : styles.area_btn
                    : styles.area_btn
                }
                onPress={() =>
                  navigation.push(`${company.value[index]}`, {
                    listName: i,
                    listKey: listKey,
                    teamKey: teamKey,
                    region: region,
                    regionKey: regionKey,
                    dataCollection: "c",
                    data: company.depth[index],
                  })
                }
              >
                <Text
                  style={
                    complete.length !== 0
                      ? complete.status_list.company.map((i) => i.status)[index] === "Y"
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
      <View style={{ flex: 1 }}></View>
    </View>
  );
}
