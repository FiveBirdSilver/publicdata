import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";

import { styles } from "../../../assets/styles/add";

export default function ServiceDog({ route, navigation }) {
  const { item } = route.params;
  const [value, setValue] = useState(null);

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
            <TouchableOpacity style={styles.footer_title}>
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
              <Text style={styles.add_subtitle}>보조견 출입 가능 여부</Text>
              <RadioButton.Group onValueChange={(v) => setValue(v)} value={value} style={styles.yesorno}>
                <View style={styles.radio}>
                  <View style={styles.radio_wrap}>
                    <Text>있다</Text>
                    <RadioButton value="Y" />
                  </View>
                  <View style={styles.radio_wrap}>
                    <Text>없다</Text>
                    <RadioButton value="N" />
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
