import React from "react";
import styled from "styled-components/native";
import theme from "../../utils/theme";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import firebase from "./../../../config";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  padding-top: 20px;
`;

const Options = styled.View`
  width: 90%;
  background-color: ${theme.lightWhite};
  height: 60px;
  align-self: center;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;
const OptionsText = styled(Text)`
  font-weight: bold;
  font-size: 20px;
`;
const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

const CheckView = styled.View`
  flex-direction: row;
`;

const SettingsOptions = () => {
  const Dispatch = useDispatch();
  const Navigation = useNavigation();
  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await SecureStore.deleteItemAsync("user");
        await SecureStore.deleteItemAsync("login");
        await SecureStore.deleteItemAsync("name");
        await SecureStore.deleteItemAsync("email");
        Dispatch({type:"USER_LOGOUT"});
        Navigation.navigate("homeApp");
      })
      .catch((E) => {
        return Alert.alert(
          "Go-Vid",
          `Error ${E}`,
          [
            {
              text: "OK",
              style: "cancel",
              onPress: () => {
                Navigation.navigate("homeApp");
              },
            },
          ],
          { cancelable: false }
        );
      });
  };

  return (
    <Container>
      <ScrollView>
        {/* <TouchableWithoutFeedback
          onPress={() => Navigation.navigate("SettingsAccountOptions")}
        >
          <Options>
            <OptionsText>Account Options</OptionsText>
          </Options>
        </TouchableWithoutFeedback> */}
        <TouchableWithoutFeedback
          onPress={() => Navigation.navigate("SettingsNotifications")}
        >
          <Options>
            <OptionsText>Notifications</OptionsText>
          </Options>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Logout()}>
          <Options style={{ backgroundColor: theme.red, height: 60 }}>
            <OptionsText style={{ color: theme.white }}>Logout</OptionsText>
          </Options>
        </TouchableWithoutFeedback>
      </ScrollView>
    </Container>
  );
};
export default SettingsOptions;
