import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native-paper";
import Constants from "expo-constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';


import theme from "../../utils/theme";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.black};
`;

const Input = styled.TextInput`
  width: 80%;
  height: 50px;
  border: 1px solid ${theme.white};
  margin-bottom: 10px;
  padding-left: 10px;
  color: ${theme.white};
  border-radius: 10px;
`;

const GetStarted = styled(Button)`
  width: 80%;
  height: 50px;
  border-radius: 10px;
  justify-content: center;
  background-color: ${theme.primaryColor};
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 10%;
`;
const Heading = styled(Text)`
  color: ${theme.white};
  font-weight: bold;
  font-size: 25px;
  padding-top: 20%;
  padding-bottom: 10px;
  align-self: center;
  width: 80%;
  text-align: left;
`;

const Icons = styled(MaterialIcons)`
  position: absolute;
  top: 10px;
  transform: rotateZ(45deg);
  left: 10px;
`;

const View = styled.View`
  height: 400px;
`;

const Touch = styled.TouchableWithoutFeedback``;

const UsernameAndPassword = ({ navigation }) => {
  const [name, _setName] = React.useState("");
  const [email, _setEmail] = React.useState("");
  const GetStartedFunction = () => {
    if (email || name === "") {
      return Alert.alert(
        "Go-Vid",
        "Please Provide your both email and name.",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else {
        SecureStore.setItemAsync('name',name);
        SecureStore.setItemAsync('email',email);
        navigation.navigate('')
    }
  };
  return (
    <Container>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icons
          onPress={() => navigation.goBack()}
          color={theme.white}
          size={30}
          name="add-circle"
        />
        <Heading>Set a password and a username.</Heading>
        <Input
          placeholder="Name"
          value={name}
          placeholderTextColor={theme.grey}
          onChangeText={(e) => _setName(e)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(e) => _setEmail(e)}
          placeholderTextColor={theme.grey}
        />
        <Touch onPress={() => GetStartedFunction()}>
          <GetStarted labelStyle={{ fontWeight: "bold", color: theme.black }}>
            Get Started
          </GetStarted>
        </Touch>
        <View />
      </ScrollView>
    </Container>
  );
};
export default UsernameAndPassword;
