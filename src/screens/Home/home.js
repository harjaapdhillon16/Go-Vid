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
import BottomNavigationBar from "../../components/BottomNavigationBar";
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
  const fetchData = async () => {
    const uid = await SecureStore.getItemAsync("user");
    firebase
      .database()
      .ref(`/users/${uid}`)
      .once("value", (snap) => {
        Dispatch(ProfileAction(snap.val()));
      });
  };
  React.useEffect(() => {
    async function authFunction() {
      const login = await SecureStore.getItemAsync("login");
      if (login === "true") {
        Dispatch(AuthAction(true));
        fetchData();
      }
    }
    authFunction();
    if (Platform.OS === "ios") {
      navigation.addListener("focus", () => setStatusBarHidden(true, "fade"));
    } else {
      navigation.addListener("focus", () => setStatusBarHidden(false, "fade"));
    }
  });

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
      <BottomNavigationBar homeScreen />
    </Container>
  );
};
export default Home;
