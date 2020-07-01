import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { setStatusBarHidden } from "expo-status-bar";
import { Button } from "react-native-paper";

import theme from "../../utils/theme";

import WelcomeImage from "../../assets/welcome.jpg";

const Container = styled.ImageBackground`
  flex: 1;
  background-color: #000;
  align-items: center;
`;
const Heading = styled(Text)`
  color: ${theme.black};
  padding-top: 35px;
  font-weight: bold;
  width: 70%;
  text-align: center;
  font-size: 20px;
`;
const OpacityView = styled.View`
  position: absolute;
  top: 20px;
  opacity: 0.1;
  align-self: center;
  width: 80%;
  height: 70px;
  border-radius: 100px;
  background-color: ${theme.black};
`;

const GetStarted = styled(Button)`
  position: absolute;
  bottom: 40px;
  align-self: center;
  background-color: ${theme.primaryColor};
`;

export default function Welcome({ navigation }) {
  React.useEffect(() => {
    setStatusBarHidden(true, "fade");
  });
  return (
    <Container source={WelcomeImage}>
      <Heading>Universe of Videos</Heading>
      <GetStarted
        onPress={()=>navigation.navigate("App")}
        mode="contained"
        labelStyle={{ fontWeight: "bold", color: theme.black }}
      >
        Get Started
      </GetStarted>
    </Container>
  );
}
