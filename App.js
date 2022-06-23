import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./page/Login";
import Home from "./page/Home";
import Collection from "./page/Collection";
import Area from "./page/Area";

import Basic_P from "./page/Pohang/Basic";
import Recommend_P from "./page/Pohang/Recommend";

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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isChecked.isChecked ? "Home" : "Login"}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Collection" component={Collection} />
        <Stack.Screen name="Area" component={Area} />
        <Stack.Screen name="Basic_P" component={Basic_P} />
        <Stack.Screen name="Recommend_P" component={Recommend_P} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
