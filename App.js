import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./page/Login";
import Home from "./page/Home";

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    AsyncStorage.getItem("User", (err, result) => {
      console.log(result);
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator> */}
        <Home />
        {/* <Login /> */}
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
