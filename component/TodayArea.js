import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../assets/styles/home";

export default function TodayArea() {
  const item = ["항목 1", "항목 2", "항목 3"];

  return (
    <>
      <View style={styles.today}>
        <Text style={styles.today_title}>오늘의 구역</Text>
      </View>
      <View style={styles.today_item}>
        {item.map((i) => (
          <TouchableOpacity key={i}>
            <Text style={styles.today_item_title}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
