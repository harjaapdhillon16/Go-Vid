import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home/home";
import Search from "../screens/Search/Search";
import Upload from "../screens/Upload/Upload";
import Notifications from "../screens/Notifications/Notifications";
import Profile from "../screens/Profile/Profile";

import EditProfile from "../screens/Profile/EditProfile";

const Stack = createBottomTabNavigator();
const Stack2 = createStackNavigator();

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
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
};

const AppNavigation2 = () => {
  return (
    <Stack2.Navigator initialRouteName="homeApp" headerMode="none">
      <Stack2.Screen name="homeApp" component={AppNavigation} />
      <Stack2.Screen name="editProfile" component={EditProfile} />
      <Stack2.Screen name="upload" component={Upload} />
    </Stack2.Navigator>
  );
};

export default AppNavigation2;
