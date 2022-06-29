import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

import { styles } from "../../../assets/styles/add";

export default function Basic({ route, navigation }) {
  const { item } = route.params;

  const [value, setValue] = useState({
    name: "",
    address: "",
    time: "",
    price: "",
    hours: "",
    close: "",
  });

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
                    value={value.name}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, name: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>주소</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="address"
                    value={value.address}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, address: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>이동소요시간</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="time"
                    value={value.time}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, time: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>관람료</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="price"
                    value={value.price}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, price: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>영업시간</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="hours"
                    value={value.hours}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, hours: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.add_container}>
                <Text style={styles.add_subtitle}>휴무일</Text>
                <View style={styles.input_wrapper}>
                  <TextInput
                    name="close"
                    value={value.close}
                    onChangeText={(text) =>
                      setValue((prev) => {
                        return { ...prev, close: text };
                      })
                    }
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
