import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Welcome from "../screens/Welcome/Welcome";
import AppNavigation from "./AppNavigation";

const Stack = createMaterialTopTabNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
    swipeEnabled={false}
    backBehavior="none"
      initialRouteName="welcome"
      tabBarOptions={{ style: { height: 0 } }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="App" component={AppNavigation} />
    </Stack.Navigator>
  );
}
