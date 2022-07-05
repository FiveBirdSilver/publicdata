import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

import { styles } from "../../../assets/styles/add";
import Input from "../../component/Input";
import axios from "axios";

export default function Basic({ route, navigation, API }) {
  const { item } = route.params;
  console.log(API);
  const [value, setValue] = useState({});

  const getText = (text, name) => {
    setValue((value) => ({
      ...value,
      [name]: text,
    }));
  };
  console.log(value);
  const handleOnSubmit = () => {
    axios.post();
  };
  return (
    <ScrollView style={styles.scrollview}>
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
              <TouchableOpacity style={styles.footer_title} onPress={() => handleOnSubmit()}>
                <AntDesign style={styles.icon} color="#00acb1" name="save" size={30} />
              </TouchableOpacity>
            </View>
            <Text>저장</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.add}>
            <View style={styles.add_wrapper}>
              <Input title="관광지명" getText={getText} name="name" />
              <Input title="주소" getText={getText} name="address" />
              <Input title="이동소요시간" getText={getText} name="time" placeholder="30분 단위로 입력" />
              <Input title="관람료" getText={getText} name="price" />
              <Input title="영업시간" getText={getText} name="hours" placeholder="EX. 09:00 ~ 18:00" />
              <Input title="휴무일" getText={getText} name="close" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
