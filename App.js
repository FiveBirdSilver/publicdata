import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Login from "./page/Login";
import { styles } from "./assets/styles/main";

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      <StatusBar style="auto" />
    </View>
  );
}
