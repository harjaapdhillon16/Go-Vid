import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { StatusBar, setStatusBarHidden } from "expo-status-bar";

import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
  padding-top: 20px;
`;

const Heading = styled(Title)`
  color: ${theme.white};
  padding: 10px;
  font-weight: bold;
`;

const Notifications = ({ navigation }) => {
  React.useEffect(() => {
    navigation.addListener("focus", () => setStatusBarHidden(false, "none"));
  });
  return (
    <Container>
      <StatusBar style="light" />
      <Heading>Notifications</Heading>
      <BottomNavigationBar />
    </Container>
  );
};
export default Notifications;
