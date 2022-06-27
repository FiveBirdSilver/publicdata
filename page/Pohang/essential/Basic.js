import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

import { styles } from "../../../assets/styles/add";

export default function Basic({ route, navigation }) {
  const { item } = route.params;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [hours, setHours] = useState("");
  const [close, setClose] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.add_title_container}>
        <View style={styles.add_title_wrapper}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title} onPress={() => navigation.goBack()}>
              <AntDesign style={styles.icon} color="#00acb1" name="back" size={30} />
            </TouchableOpacity>
          </View>
          <Text>뒤로</Text>
        </View>
        <Text style={styles.add_title}>{item}</Text>

        <View style={styles.add_title_wrapper}>
          <View style={styles.icon_wrap}>
            <TouchableOpacity style={styles.footer_title} onPress={() => navigation.goBack()}>
              <AntDesign style={styles.icon} color="#00acb1" name="save" size={30} />
            </TouchableOpacity>
          </View>
          <Text>저장</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.add}>
          <View style={styles.add_wrapper}>
            <View style={styles.add_container}>
              <Text style={styles.add_subtitle}>관광지명</Text>
              <View style={styles.input_wrapper}>
                <TextInput
                  name="name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={styles.input}
                ></TextInput>
              </View>
            </View>
            <View style={styles.add_container}>
              <Text style={styles.add_subtitle}>주소</Text>
              <View style={styles.input_wrapper}>
                <TextInput
                  name="address"
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  style={styles.input}
                ></TextInput>
              </View>
            </View>
            <View style={styles.add_container}>
              <Text style={styles.add_subtitle}>이동소요시간</Text>
              <View style={styles.input_wrapper}>
                <TextInput
                  name="time"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  style={styles.input}
                ></TextInput>
              </View>
            </View>
            <View style={styles.add_container}>
              <Text style={styles.add_subtitle}>관람료</Text>
              <View style={styles.input_wrapper}>
                <TextInput
                  name="price"
                  value={price}
                  onChangeText={(text) => setPrice(text)}
                  style={styles.input}
                ></TextInput>
              </View>
            </View>
            <View style={styles.add_container}>
              <Text style={styles.add_subtitle}>영업시간</Text>
              <View style={styles.input_wrapper}>
                <TextInput
                  name="hours"
                  value={hours}
                  onChangeText={(text) => setHours(text)}
                  style={styles.input}
                ></TextInput>
              </View>
            </View>
            <View style={styles.add_container}>
              <Text style={styles.add_subtitle}>휴무일</Text>
              <View style={styles.input_wrapper}>
                <TextInput
                  name="close"
                  value={close}
                  onChangeText={(text) => setClose(text)}
                  style={styles.input}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
