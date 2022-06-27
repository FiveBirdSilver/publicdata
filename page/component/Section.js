import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../../assets/styles/add";

// Program.js만 적용되어 있음

export default function Section({ item }) {
  const navigation = useNavigation();

  return (
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
  );
}
