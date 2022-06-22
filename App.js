import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./page/Login";
import Home from "./page/Home";
import Collection from "./page/Collection";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [userInfo, setUserInfo] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("User", (err, result) => {
      if (result) {
        setUserInfo(JSON.parse(result));
      }
    });
    AsyncStorage.getItem("IsChecked", (err, result) => {
      if (result) {
        setIsChecked(JSON.parse(result));
      }
    });
  }, []);
  console.log(isChecked.isChecked);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isChecked.isChecked ? "Home" : "Login"}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Collection" component={Collection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
