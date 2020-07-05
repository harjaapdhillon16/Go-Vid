import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import theme from "../../utils/theme";

const Container = styled.View`
  flex-direction: row;
  padding-top: 10px;
  width: 90%;
  justify-content: center;
  align-self: center;
  padding-bottom: 10px;
`;
const EditProfile = styled(Button)`
  background-color: ${theme.primaryColor};
  margin-right: 5px;
`;
const Settings = styled(Button)`
  margin-left: 5px;
  background-color: ${theme.red};
`;

const ProfileActions = () => {
  const Navigation = useNavigation()
  return (
    <Container>
      <EditProfile
        labelStyle={{ fontWeight: "bold", color: theme.black }}
        mode="contained"
        onPress={() => Navigation.navigate('editProfile')}
      >
        Edit Profile
      </EditProfile>
      <Settings
        labelStyle={{ fontWeight: "bold" }}
        mode="contained"
        onPress={() => Navigation.navigate('settings')}
      >
        Settings
      </Settings>
    </Container>
  );
};
export default ProfileActions;
