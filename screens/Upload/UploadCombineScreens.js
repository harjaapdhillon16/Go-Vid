import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Camera from "./Camera";
import Upload from "./Upload";
import GalleryLoad from "./GalleryLoad";

const Stack = createMaterialTopTabNavigator();

const UploadCombineScreens = () => {
  return (
    <Stack.Navigator
      swipeEnabled={true}
      tabBarOptions={{ style: { height: 0 } }}
      initialRouteName="galleryLoad"
    >
      <Stack.Screen name="galleryLoad" component={GalleryLoad} />
      <Stack.Screen name="upload" component={Upload} />
    </Stack.Navigator>
  );
};
export default UploadCombineScreens;
