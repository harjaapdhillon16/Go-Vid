import React, { Component, useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import styled from "styled-components/native";
import { Camera, Audio } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";

import theme from "../../utils/theme";
import Record from "./Record";

const Container = styled.View``;

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [VideoLocation, _setVideoLocation] = React.useState([]);
  const [Recorded, _setRecorded] = React.useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Container style={{ flex: 1 }}>
      {Recorded ? (
        <View />
      ) : (
        <Record
          VideoPathSet={(path) => {
            const paths = VideoLocation;
            paths.push(path);
            _setVideoLocation([...paths]);
            console.log(paths);
          }}
          goBack={() => navigation.goBack()}
        />
      )}
    </Container>
  );
}
