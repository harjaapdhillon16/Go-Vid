import React from "react";
import styled from "styled-components/native";
import { Text, Checkbox } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

import firebase from "../../../config";
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
  font-size: 20px;
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

const CheckView = styled.View`
  background-color: ${theme.lightBlack};
  flex-direction: row;
  margin-left: 20px;
  width: 180px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Row = styled.View`
  padding-top: 20px;
`;

const OnOf = styled(Text)`
  color: ${theme.white};
  padding: 10px;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const AccountOptions = ({ navigation }) => {
  const [PublicPrivate, _setAccountPrivacyState] = React.useState(true);

  const PublicAccount = async () => {
    _setAccountPrivacyState(true);
    const uid = await SecureStore.getItemAsync("user");
    firebase.database().ref(`users/${uid}/public`).set(true);
  };
  const PrivateAccount = async () => {
    _setAccountPrivacyState(false);
    const uid = await SecureStore.getItemAsync("user");
    firebase.database().ref(`users/${uid}/public`).set(false);
  };

  return (
    <Container>
      <Container2>
        <RowView>
          <Heading>Account Options</Heading>
          <Icon
            size={40}
            onPress={() => navigation.goBack()}
            color={theme.white}
            name="add-circle"
          />
        </RowView>
        <Row>
          <TouchableOpacity onPress={() => PublicAccount()}>
            <CheckView>
              <OnOf>Public Account</OnOf>
              <Checkbox status={PublicPrivate ? "checked" : "unchecked"} />
            </CheckView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => PrivateAccount()}>
            <CheckView>
              <OnOf>Private Account</OnOf>
              <Checkbox status={!PublicPrivate ? "checked" : "unchecked"} />
            </CheckView>
          </TouchableOpacity>
        </Row>
      </Container2>
    </Container>
  );
};
export default AccountOptions;
