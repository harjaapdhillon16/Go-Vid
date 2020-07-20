import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native-paper";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
  justify-content: center;
  padding-top: ${Constants.statusBarHeight}px;
  align-items: center;
  padding-bottom: 70px;
`;

const Heading = styled(Text)`
  color: ${theme.white};
  font-weight: bold;
  padding-bottom: 10px;
  font-size: 20px;
  width: 90%;
  text-align: center;
`;

const Image = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 10px;
  background-color: ${theme.primaryColor};
  margin-bottom: 10px;
`;

const Signup = styled(Button)`
  background-color: ${theme.blue};
  color: ${theme.white};
  width: 70%;
  margin-bottom: 10px;
`;
const Login = styled(Button)`
  border: 2px solid ${theme.blue};
  width: 70%;
`;

const AuthProfile = () => {
  const Navigation = useNavigation();
  return (
    <Container>
      <Image
        source={{
          uri:
            "https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png",
        }}
      />
      <Heading>Sign up or login to view your account</Heading>
      <Signup
        onPress={() => Navigation.navigate("signup")}
        labelStyle={{ color: theme.white, fontWeight: "bold" }}
      >
        Signup
      </Signup>
      <Login
        onPress={() => Navigation.navigate("login")}
        labelStyle={{ color: theme.white, fontWeight: "bold" }}
      >
        Login
      </Login>
      <BottomNavigationBar />
    </Container>
  );
};

export default AuthProfile;
