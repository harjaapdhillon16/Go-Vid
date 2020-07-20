import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

import ProfileCard from "../../components/Profile/ProfileCard";
import ProfileMedia from "../../components/Profile/ProfileMedia";
import UserProfileActions from "../../components/UserProfile/UserProfileActions";
import ProfileActions from "../../components/Profile/ProfileActions";
import PrivateCard from "../../components/Profile/PrivateCard";
import UserMedia from "../../components/UserProfile/UserMedia";

import firebase from "../../../config";
import theme from "../../utils/theme";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
`;
const ScrollView = styled.ScrollView`
  margin-top: ${Constants.statusBarHeight}px;
`;

const Profile = ({ navigation, route }) => {
  React.useEffect(() => {
    navigation.addListener("focus", async () => {
      const uniqueId = await SecureStore.getItemAsync("user");
      _setUserID(uniqueId);
      setStatusBarHidden(false, "none");
      const { params } = route;
      _setData({ ...params });
      fetchUser(params.uid);
    });
  });

  function fetchUser(uid) {
    firebase
      .database()
      .ref(`users/${uid}`)
      .once("value", (snap) => {
        _setData(snap.val());
      });
  }

  const [data, _setData] = React.useState({});

  const [userID, _setUserID] = React.useState("");
  return (
    <>
      {userID === route.params.uid ? (
        <Container>
          <StatusBar style="light" />
          <ScrollView>
            <ProfileCard data={data} />
            <ProfileActions />
            <ProfileMedia />
          </ScrollView>
        </Container>
      ) : (
        <Container>
          <StatusBar style="light" />
          <ScrollView>
            <ProfileCard data={data} />
            <UserProfileActions />
            {data.public ? <UserMedia uid={route.params.uid} /> : null}
          </ScrollView>
        </Container>
      )}
    </>
  );
};
export default Profile;
