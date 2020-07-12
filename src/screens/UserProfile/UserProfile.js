import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import ProfileCard from "../../components/Profile/ProfileCard";
import ProfileMedia from "../../components/Profile/ProfileMedia";
import UserProfileActions from "../../components/UserProfile/UserProfileActions";

import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
`;
const ScrollView = styled.ScrollView`
  margin-top: ${Constants.statusBarHeight}px;
`;

const Heading = styled(Title)`
  color: ${theme.white};
`;

const Profile = ({ navigation }) => {
  React.useEffect(() => {
    navigation.addListener("focus", () => setStatusBarHidden(false, "none"));
  });
  return (
    <Container>
      <StatusBar style="light" />
      <ScrollView>
        <ProfileCard />
        <UserProfileActions/>
        <ProfileMedia />
      </ScrollView>
    </Container>
  );
};
export default Profile;
