import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";

import store from "./src/redux/store";

import Navigation from "./src/Navigation/GlobalNavigation";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <ReduxProvider store={store}>
          <StatusBar style="light" />
          <Navigation />
        </ReduxProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
