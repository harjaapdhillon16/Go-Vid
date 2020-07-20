import React from "react";
import styled from "styled-components/native";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import firebase from "../../../config";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";

import AuthProfile from "../Auth/AuthProfile";
import ProfileCard from "../../components/Profile/ProfileCard";
import ProfileActions from "../../components/Profile/ProfileActions";
import ProfileMedia from "../../components/Profile/ProfileMedia";

import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
`;
const ScrollView = styled.ScrollView`
  margin-top: ${Constants.statusBarHeight}px;
`;
const View40 = styled.View`
  height: 40px;
`;

const Profile = ({ navigation }) => {
  const [data, _setData] = React.useState({});

  const Auth = useSelector((state) => state.auth.AuthValue);
  const [authState, _setAuthState] = React.useState(Auth);
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setStatusBarHidden(false, "none");
    });
  });
  React.useEffect(() => {
    console.log(Auth);
    _setAuthState(Auth);
  }, [Auth]);

 
  const UserData = useSelector((state) => state.profile);

  return (
    <>
      {authState ? (
        <Container>
          <StatusBar style="light" />
          <ScrollView>
            <ProfileCard data={UserData} />
            <ProfileActions />
            <ProfileMedia />
            <View40 />
          </ScrollView>
          <BottomNavigationBar />
        </Container>
      ) : (
        <AuthProfile />
      )}
    </>
  );
};
export default Profile;
