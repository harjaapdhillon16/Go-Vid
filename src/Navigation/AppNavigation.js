import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home/home";
import Search from "../screens/Search/Search";
import UploadCombine from "../screens/Upload/UploadCombineScreens";
import Notifications from "../screens/Notifications/Notifications";
import Profile from "../screens/Profile/Profile";

import EditProfile from "../screens/Profile/EditProfile";
import Settings from "../screens/Profile/SettingNavigator";
import UserProfile from "../screens/UserProfile/UserProfile";

import SignUp from "../screens/Auth/SignUpNavigator";
import Login from "../screens/Auth/Login";

import Followers from "../screens/Follow/Followers";
import Following from "../screens/Follow/Following";

import VideoView from "../screens/VideoView/VideoView";

import Latest from "../screens/Latest/Latest";

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
      <Stack.Screen name="followers" component={Followers} />
      <Stack.Screen name="following" component={Following} />
      <Stack2.Screen name="userProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

const AppNavigation2 = () => {
  return (
    <Stack2.Navigator initialRouteName="homeApp" headerMode="none">
      <Stack2.Screen name="homeApp" component={AppNavigation} />
      <Stack2.Screen name="editProfile" component={EditProfile} />
      <Stack2.Screen
        options={{ gestureEnabled: false }}
        name="UploadCombine"
        component={UploadCombine}
      />
      <Stack2.Screen name="settings" component={Settings} />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="signup"
        component={SignUp}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="login"
        component={Login}
      />
      <Stack.Screen name="videoView" component={VideoView} />
      <Stack.Screen name="latest" component={Latest} />
    </Stack2.Navigator>
  );
};

export default AppNavigation2;
