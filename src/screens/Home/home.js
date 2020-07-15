import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { Platform, Dimensions } from "react-native";
import Constants from "expo-constants";

import SwipingView from "../../components/Home/SwipingView";
import Post from "../../components/Home/VideoWithLikes";
import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  height: ${Dimensions.get("screen").height}px;
  padding-top: ${Platform.OS === "android"
    ? `${Constants.statusBarHeight}px`
    : "0px"};
`;

const Heading = styled(Title)`
  color: ${theme.white};
`;

const Home = ({ navigation }) => {
  React.useEffect(() => {
    if (Platform.OS === "ios") {
      navigation.addListener("focus", () => setStatusBarHidden(true, "fade"));
    } 
    else{
      navigation.addListener("focus", () => setStatusBarHidden(false, "fade"));
    }
  });
  return (
    <Container>
      <StatusBar style="light" />
      <SwipingView />
      <BottomNavigationBar homeScreen />
    </Container>
  );
};
export default Home;
