import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import Post from "../../components/Home/Post";
import VideoPost from "../../components/Home/VideoWithLikes";
import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
  padding-top: ${Platform.OS === "android" ? "20px" : "0px"};
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
      <StatusBar style="light" />
      <Post />
      <BottomNavigationBar homeScreen />
    </Container>
  );
};
export default Home;
