import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { Platform, Dimensions } from "react-native";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import firebase from "../../../config";

import SwipingView from "../../components/Home/SwipingView";
import Post from "../../components/Home/VideoWithLikes";
import theme from "../../utils/theme";
import AuthAction from "../../redux/Auth/AuthAction";
import ProfileAction from "../../redux/ProfileDetails/ProfileAction";
import FetchHomeFeed from "../../api/FetchHomeFeed";

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
  const Dispatch = useDispatch();
  const [Data, _setData] = React.useState([]);

  React.useEffect(() => {
    async function hello() {
      if (Data.length === 0) {
        const result = await FetchHomeFeed();
        _setData(result);
      }
    }
    hello();
  }, [Data]);

  return (
    <Container>
      <StatusBar style="light" />
      <SwipingView Data={Data} navigation={navigation} />
    </Container>
  );
};
export default Home;
