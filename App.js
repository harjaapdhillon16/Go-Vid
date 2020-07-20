import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { Audio } from "expo-av";

import store from "./src/redux/store";

import Navigation from "./src/Navigation/GlobalNavigation";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  React.useEffect(() => {
    async function load() {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        shouldDuckAndroid: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
      });
      await Audio.setIsEnabledAsync(true);
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: "./src/assets/silence.mp3" });
      sound.playAsync();
      sound.setIsMutedAsync(true);
      sound.setIsLoopingAsync(true);
    }
    load();
  });
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
