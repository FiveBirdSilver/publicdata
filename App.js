import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

import Door_D from "./page/Daegu/company/Door";
import Doorway_D from "./page/Daegu/company/Doorway";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Area_P" component={Area_P} />
        <Stack.Screen name="Basic_P" component={Basic_P} />
        <Stack.Screen name="Recommend_P" component={Recommend_P} />
        <Stack.Screen name="ServiceDog_P" component={ServiceDog_P} />
        <Stack.Screen name="Ad_P" component={Ad_P} />
        <Stack.Screen name="Program_P" component={Program_P} />
        <Stack.Screen name="Guide_P" component={Guide_P} />
        <Stack.Screen name="Facility_P" component={Facility_P} />
        <Stack.Screen name="Leaflet_P" component={Leaflet_P} />

        <Stack.Screen name="Footpath_P" component={Footpath_P} />
        <Stack.Screen name="ETC_P" component={ETC_P} />
        <Stack.Screen name="Stairs_P" component={Stairs_P} />
        <Stack.Screen name="Runway_P" component={Runway_P} />
        <Stack.Screen name="Roadchin_P" component={Roadchin_P} />
        <Stack.Screen name="Elevator_P" component={Elevator_P} />

        <Stack.Screen name="ParkBasic_P" component={ParkBasic_P} />
        <Stack.Screen name="ParkingArea_P" component={ParkingArea_P} />
        <Stack.Screen name="ParkFootpath_P" component={ParkFootpath_P} />

        <Stack.Screen name="EtoBasic_P" component={EtoBasic_P} />

        <Stack.Screen name="TBasic_P" component={TBasic_P} />
        <Stack.Screen name="Entrance_P" component={Entrance_P} />
        <Stack.Screen name="EntranceDoorWay_P" component={EntranceDoorWay_P} />
        <Stack.Screen name="InteriorEntrance_P" component={InteriorEntrance_P} />
        <Stack.Screen name="Washstand_P" component={Washstand_P} />
        <Stack.Screen name="Urinal_P" component={Urinal_P} />
        <Stack.Screen name="Toilet_P" component={Toilet_P} />
        <Stack.Screen name="Facilities_P" component={Facilities_P} />
        <Stack.Screen name="DisabledToilet_P" component={DisabledToilet_P} />

        <Stack.Screen name="Area_D" component={Area_D} />
        <Stack.Screen name="Door_D" component={Door_D} />
        <Stack.Screen name="Doorway_D" component={Doorway_D} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
