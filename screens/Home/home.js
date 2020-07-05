import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { setStatusBarHidden } from "expo-status-bar";
import { Platform } from "react-native";

import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
`;

const Heading = styled(Title)`
  color: ${theme.white};
`;

const Home = ({ navigation }) => {
  React.useEffect(() => {
    if (Platform.OS === "ios") {
      navigation.addListener("focus", () => setStatusBarHidden(true, "fade"));
    }
  });
  return (
    <Container>
      <Heading>Hello Home</Heading>
      <BottomNavigationBar homeScreen />
    </Container>
  );
};
export default Home;
