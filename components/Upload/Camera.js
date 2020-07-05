import React, { Component, useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import styled from "styled-components/native";
import { Camera } from "expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import theme from "../../utils/theme";
import Record from "./Record";

const Container = styled.View``;

const Icon = styled(MaterialIcons)`
  transform: rotateZ(45deg);
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
  elevation: 2;
`;

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation()
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Container  style={{ flex: 1 }}>
      <Icon onPress={()=>navigation.goBack()} name="add-circle" color={theme.red} size={40} />
      <Record />
    </Container>
  );
}
