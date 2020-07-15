import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { StatusBar, setStatusBarHidden } from "expo-status-bar";
import Constants from "expo-constants";

import NotificationComponent from "../../components/Notifications/NotificationComponent";
import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;

const Heading = styled(Title)`
  color: ${theme.white};
  padding: 10px;
  padding-top: 0px;
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
      <NotificationComponent />
      <NotificationComponent />
      <BottomNavigationBar />
    </Container>
  );
};
export default Notifications;
