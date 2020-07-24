import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";

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

const Back = styled(Button)`
  width: 92%;
  align-self: center;
  margin-bottom: 10px;
  background-color: ${theme.blue};
`;

const Profile = ({ navigation }) => {
  const UserProfile = useSelector((state) => state.userProfile);
  const [data, _setData] = React.useState({});
  const [userID, _setUserID] = React.useState("");

  React.useEffect(() => {
    async function fetch() {
      _setData({ ...UserProfile });
      const uniqueId = await SecureStore.getItemAsync("user");
      _setUserID(uniqueId);
      setStatusBarHidden(false, "none");
      fetchUser(UserProfile.uid);
    }
    fetch();
  }, [UserProfile]);

  function fetchUser(uid) {
    firebase
      .database()
      .ref(`users/${uid}`)
      .once("value", (snap) => {
        _setData(snap.val());
      });
  }
  
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setStatusBarHidden(false, "fade");
    });
  });

  return (
    <>
      {userID === UserProfile.uid ? (
        <Container>
          <StatusBar style="light" />
          <ScrollView>
            <ProfileCard uid={data.uid} data={data} />
            <ProfileActions />
            <Back
              onPress={() => navigation.goBack()}
              labelStyle={{ fontWeight: "bold", color: theme.white }}
            >
              Back
            </Back>
            <ProfileMedia />
          </ScrollView>
        </Container>
      ) : (
        <Container>
          <StatusBar style="light" />
          <ScrollView>
            <ProfileCard uid={data.uid} data={data} />
            <UserProfileActions userID={UserProfile.uid} />
            {data.public ? <UserMedia uid={UserProfile.uid} /> : null}
          </ScrollView>
        </Container>
      )}
    </>
  );
};
export default Profile;
