import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

import Login from "./page/Login";
import Home from "./page/Home";
import Area_P from "./page/Pohang/Area";
import Area_D from "./page/Daegu/Area";

import Basic_P from "./page/Pohang/essential/Basic";
import Recommend_P from "./page/Pohang/essential/Recommend";
import ServiceDog_P from "./page/Pohang/essential/ServiceDog";
import Ad_P from "./page/Pohang/essential/Ad";
import Program_P from "./page/Pohang/essential/Program";
import Guide_P from "./page/Pohang/essential/Guide";
import Facility_P from "./page/Pohang/essential/Facility";
import Leaflet_P from "./page/Pohang/essential/Leaflet";

import Footpath_P from "./page/Pohang/coreRoute/Footpath";
import ETC_P from "./page/Pohang/coreRoute/ETC";
import Stairs_P from "./page/Pohang/coreRoute/Stairs";
import Runway_P from "./page/Pohang/coreRoute/Runway";
import Roadchin_P from "./page/Pohang/coreRoute/Roadchin";
import Elevator_P from "./page/Pohang/coreRoute/Elevator";

import ParkBasic_P from "./page/Pohang/park/Basic";
import ParkingArea_P from "./page/Pohang/park/ParkingArea";
import ParkFootpath_P from "./page/Pohang/park/ParkFootpath";

import EtoBasic_P from "./page/Pohang/eto/Basic";

import TBasic_P from "./page/Pohang/toilet/Basic";
import Entrance_P from "./page/Pohang/toilet/Entrance";
import EntranceDoorWay_P from "./page/Pohang/toilet/EntranceDoorWay";
import InteriorEntrance_P from "./page/Pohang/toilet/InteriorEntrance";
import Washstand_P from "./page/Pohang/toilet/Washstand";
import Urinal_P from "./page/Pohang/toilet/Urinal";
import Toilet_P from "./page/Pohang/toilet/Toilet";
import Facilities_P from "./page/Pohang/toilet/Facilities";
import DisabledToilet_P from "./page/Pohang/toilet/DisabledToilet";

import Basic_D from "./page/Daegu/company/Basic";
import Door_D from "./page/Daegu/company/Door";
import Doorway_D from "./page/Daegu/company/Doorway";
import Ramp_D from "./page/Daegu/company/Ramp";
import Inside_D from "./page/Daegu/company/Inside";
import Outside_D from "./page/Daegu/company/Outside";

import Type_D from "./page/Daegu/Toilet/Type";
import TDoor_D from "./page/Daegu/Toilet/Door";
import TDoorway_D from "./page/Daegu/Toilet/Doorway";
import TRamp_D from "./page/Daegu/Toilet/Ramp";
import Washstand_D from "./page/Daegu/Toilet/Washstand";
import Handle_D from "./page/Daegu/Toilet/Handle";
import Backrest_D from "./page/Daegu/Toilet/Backrest";

export default function App() {
  const Stack = createNativeStackNavigator();
  LogBox.ignoreLogs(["Remote debugger"]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />

        <Stack.Screen name="Area_P" options={{ headerShown: false }} component={Area_P} />
        <Stack.Screen name="Basic_P" options={{ headerShown: false }} component={Basic_P} />
        <Stack.Screen name="Recommend_P" options={{ headerShown: false }} component={Recommend_P} />
        <Stack.Screen name="ServiceDog_P" options={{ headerShown: false }} component={ServiceDog_P} />
        <Stack.Screen name="Ad_P" options={{ headerShown: false }} component={Ad_P} />
        <Stack.Screen name="Program_P" options={{ headerShown: false }} component={Program_P} />
        <Stack.Screen name="Guide_P" options={{ headerShown: false }} component={Guide_P} />
        <Stack.Screen name="Facility_P" options={{ headerShown: false }} component={Facility_P} />
        <Stack.Screen name="Leaflet_P" options={{ headerShown: false }} component={Leaflet_P} />

        <Stack.Screen name="Footpath_P" options={{ headerShown: false }} component={Footpath_P} />
        <Stack.Screen name="ETC_P" options={{ headerShown: false }} component={ETC_P} />
        <Stack.Screen name="Stairs_P" options={{ headerShown: false }} component={Stairs_P} />
        <Stack.Screen name="Runway_P" options={{ headerShown: false }} component={Runway_P} />
        <Stack.Screen name="Roadchin_P" options={{ headerShown: false }} component={Roadchin_P} />
        <Stack.Screen name="Elevator_P" options={{ headerShown: false }} component={Elevator_P} />

        <Stack.Screen name="ParkBasic_P" options={{ headerShown: false }} component={ParkBasic_P} />
        <Stack.Screen name="ParkingArea_P" options={{ headerShown: false }} component={ParkingArea_P} />
        <Stack.Screen name="ParkFootpath_P" options={{ headerShown: false }} component={ParkFootpath_P} />

        <Stack.Screen name="EtoBasic_P" options={{ headerShown: false }} component={EtoBasic_P} />

        <Stack.Screen name="TBasic_P" options={{ headerShown: false }} component={TBasic_P} />
        <Stack.Screen name="Entrance_P" options={{ headerShown: false }} component={Entrance_P} />
        <Stack.Screen name="EntranceDoorWay_P" options={{ headerShown: false }} component={EntranceDoorWay_P} />
        <Stack.Screen name="InteriorEntrance_P" options={{ headerShown: false }} component={InteriorEntrance_P} />
        <Stack.Screen name="Washstand_P" options={{ headerShown: false }} component={Washstand_P} />
        <Stack.Screen name="Urinal_P" options={{ headerShown: false }} component={Urinal_P} />
        <Stack.Screen name="Toilet_P" options={{ headerShown: false }} component={Toilet_P} />
        <Stack.Screen name="Facilities_P" options={{ headerShown: false }} component={Facilities_P} />
        <Stack.Screen name="DisabledToilet_P" options={{ headerShown: false }} component={DisabledToilet_P} />

        <Stack.Screen name="Area_D" options={{ headerShown: false }} component={Area_D} />
        <Stack.Screen name="Basic_D" options={{ headerShown: false }} component={Basic_D} />
        <Stack.Screen name="Door_D" options={{ headerShown: false }} component={Door_D} />
        <Stack.Screen name="Doorway_D" options={{ headerShown: false }} component={Doorway_D} />
        <Stack.Screen name="Ramp_D" options={{ headerShown: false }} component={Ramp_D} />
        <Stack.Screen name="Inside_D" options={{ headerShown: false }} component={Inside_D} />
        <Stack.Screen name="Outside_D" options={{ headerShown: false }} component={Outside_D} />

        <Stack.Screen name="Type_D" options={{ headerShown: false }} component={Type_D} />
        <Stack.Screen name="TDoor_D" options={{ headerShown: false }} component={TDoor_D} />
        <Stack.Screen name="TDoorway_D" options={{ headerShown: false }} component={TDoorway_D} />
        <Stack.Screen name="TRamp_D" options={{ headerShown: false }} component={TRamp_D} />
        <Stack.Screen name="Washstand_D" options={{ headerShown: false }} component={Washstand_D} />
        <Stack.Screen name="Handle_D" options={{ headerShown: false }} component={Handle_D} />
        <Stack.Screen name="Backrest_D" options={{ headerShown: false }} component={Backrest_D} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
