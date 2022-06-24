import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./page/Login";
import Home from "./page/Home";
import Collection from "./page/Collection";
import Area_P from "./page/Pohang/Area";
import Area_D from "./page/Daegu/Area";

import Basic_P from "./page/Pohang/Basic";
import Recommend_P from "./page/Pohang/Recommend";
import ServiceDog_P from "./page/Pohang/ServiceDog";
import Ad_P from "./page/Pohang/Ad";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Collection" component={Collection} />

        <Stack.Screen name="Area_P" component={Area_P} />
        <Stack.Screen name="Basic_P" component={Basic_P} />
        <Stack.Screen name="Recommend_P" component={Recommend_P} />
        <Stack.Screen name="ServiceDog_P" component={ServiceDog_P} />
        <Stack.Screen name="Ad_P" component={Ad_P} />

        <Stack.Screen name="Area_D" component={Area_D} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
