import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

import theme from "../../utils/theme";

import LikedPosts from "./LikedPosts";
import OwnPosts from "./OwnPosts";
import FavoritePosts from "./FavoritePosts";

const Stack = createMaterialTopTabNavigator();

const ProfileMedia = () => {
  return (
    <Stack.Navigator
      initialRouteName="ownPost"
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        style: {
          backgroundColor: theme.black,
          borderColor: theme.white,
          borderTopWidth: 0.4,
        },
      }}
    >
      <Stack.Screen
        name="ownPost"
        component={OwnPosts}
        came="sad"
        options={{
          tabBarIcon: () => (
            <MaterialIcons color={theme.white} name="perm-media" size={20} />
          ),
        }}
      />

      <Stack.Screen
        name="likedPosts"
        component={LikedPosts}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              color={theme.white}
              name="favorite-border"
              size={20}
            />
          ),
        }}
      />
      <Stack.Screen
        name="favoritePosts"
        component={FavoritePosts}
        options={{
          tabBarIcon: () => (
            <Fontisto color={theme.white} name="favorite" size={20} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
export default ProfileMedia;
