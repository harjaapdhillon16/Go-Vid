import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import Navigation from "./Navigation/GlobalNavigation";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <StatusBar style="dark-content" />
          <Navigation />
        </PaperProvider>
      </NavigationContainer>
      <StatusBar style="dark-content" />
    </>
  );
}
