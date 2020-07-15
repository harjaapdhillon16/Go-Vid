import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NameAndEmail from "./NameAndEmail";

const Stack = createMaterialTopTabNavigator();

const SingUpNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="NameAndEmail"
      tabBarOptions={{ style: { height: 0 } }}
    >
      <Stack.Screen name="NameAndEmail" component={NameAndEmail} />
    </Stack.Navigator>
  );
};
export default SingUpNavigator;
