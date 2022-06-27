import { Text, View } from "react-native";
import { styles } from "../../assets/styles/home";

export default function Header(props) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
    </>
  );
}
