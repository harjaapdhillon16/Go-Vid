import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { setStatusBarHidden } from "expo-status-bar";

import Camera from "../../components/Camera/CameraComponent";
import theme from "../../utils/theme";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
`;

const Heading = styled(Title)`
  color: ${theme.white};
`;

const CameraComponent = ({ navigation }) => {
  React.useState(() => {
    navigation.addListener("focus", () => setStatusBarHidden(true, "slide"));
  });
  return (
    <Container>
      <Camera />
    </Container>
  );
};
export default CameraComponent;
