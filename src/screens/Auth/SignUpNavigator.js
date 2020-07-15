import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NameAndEmail from "./NameAndEmail";
import UsernameAndPassword from "./UsernameAndPassword";
import ProfilePicture from "./ProfilePicture";

const Stack = createMaterialTopTabNavigator();

const SignUpNavigator = () => {
  return (
    <Stack.Navigator
      swipeEnabled={false}
      initialRouteName="NameAndEmail"
      tabBarOptions={{ style: { height: 0 } }}
    >
      <Stack.Screen name="NameAndEmail" component={NameAndEmail} />
      <Stack.Screen
        name="UsernameAndPassword"
        component={UsernameAndPassword}
      />
      <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
    </Stack.Navigator>
  );
};
export default SignUpNavigator;
