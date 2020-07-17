import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Settings from "./Settings";
import Notifications from "./../../components/Settings/Notifications";
import AccountOptions from "../../components/Settings/AccountOptions";

const Stack = createBottomTabNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="settings" tabBarOptions={{style:{height:0,marginBottom:-1,display:'none'}}}>
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="SettingsNotifications" component={Notifications} />
      <Stack.Screen name="SettingsAccountOptions" component={AccountOptions} />
    </Stack.Navigator>
  );
};
export default SettingNavigator;
