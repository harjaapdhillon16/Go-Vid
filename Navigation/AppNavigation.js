import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home/home";
import Search from "../screens/Search/Search";
import Upload from "../screens/Upload/Upload";
import Notifications from "../screens/Notifications/Notifications";
import Profile from "../screens/Profile/Profile";

const Stack = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      tabBarOptions={{
        style: { height: 0, marginBottom: -1 },
        showLabel: false,
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="search" component={Search} />
      <Stack.Screen name="upload" component={Upload} />
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen name="profile" component={Profile} />

    </Stack.Navigator>
  );
};
export default AppNavigation;
