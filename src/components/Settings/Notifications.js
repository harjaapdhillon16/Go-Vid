import React from "react";
import styled from "styled-components/native";
import { Text, Checkbox } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";


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
  margin-top: 10px;
  border-radius: 10px;
`;

const Heading = styled(Text)`
  color: ${theme.primaryColor};
  font-weight: bold;
  padding-top: 5px;
  font-size: 30px;
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
  border-radius: 5px;
`;

const Row = styled.View`
  flex-direction: row;
  padding-top: 20px;
`;

const OnOf = styled(Text)`
  color: ${theme.white};
  padding: 10px;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const Notifications = ({ navigation }) => {
  const [notificationsOn, _setNotificationState] = React.useState(true);

  const TurnOnNotifications = () => {
    _setNotificationState(true);
    SecureStore.setItemAsync("notifications", "true");
  };
  const TurnOffNotifications = () => {
    _setNotificationState(false);
    SecureStore.setItemAsync("notifications", "false");
  };

  return (
    <Container>
      <Container2>
        <RowView>
          <Heading>Notifications</Heading>
          <Icon
            size={40}
            onPress={() => navigation.goBack()}
            color={theme.white}
            name="add-circle"
          />
        </RowView>
        <Row>
          <TouchableOpacity onPress={() => TurnOnNotifications()}>
            <CheckView>
              <OnOf>On</OnOf>
              <Checkbox status={notificationsOn ? "checked" : "unchecked"} />
            </CheckView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => TurnOffNotifications()}>
            <CheckView>
              <OnOf>Off</OnOf>
              <Checkbox status={!notificationsOn ? "checked" : "unchecked"} />
            </CheckView>
          </TouchableOpacity>
        </Row>
      </Container2>
    </Container>
  );
};
export default Notifications;
