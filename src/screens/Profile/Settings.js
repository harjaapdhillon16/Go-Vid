import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";
import Constants from "expo-constants";

import SettingsOptions from "../../components/Settings/SettingsOptions";
import theme from "../../utils/theme";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.lightBlack};
  padding-top:${Constants.statusBarHeight}px;
`;
const Container2 = styled.View`
  flex: 1;
  background-color: ${theme.black};
  width: 90%;
  align-self: center;
  margin-bottom: 5px;
  margin-top:10px;
  border-radius: 10px;
`;

const Heading = styled(Text)`
  color: ${theme.primaryColor};
  font-weight: bold;
  padding-top: 5px;
  font-size: 40px;
  transform: translateX(-12px);
  width: 90%;
`;

const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled(MaterialIcons)`
  transform: rotateZ(45deg);
`;

const Settings = ({ navigation }) => {
  return (
    <Container>
      <Container2>
        <RowView>
          <Heading>Settings</Heading>
          <Icon
            size={30}
            onPress={() => navigation.goBack()}
            color={theme.white}
            name="add-circle"
          />
        </RowView>
        <SettingsOptions />
      </Container2>
    </Container>
  );
};
export default Settings;
