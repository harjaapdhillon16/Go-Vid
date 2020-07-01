import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home/home";

const Stack = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator tabBarOptions={{style:{height:0,marginBottom:-1},showLabel:false}}>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};
export default AppNavigation;
