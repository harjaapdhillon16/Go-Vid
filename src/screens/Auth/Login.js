import React from "react";
import styled from "styled-components/native";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import Constants from "expo-constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Alert, Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";

import firebase from "../../../config";
import theme from "../../utils/theme";
import ProfileAction from "../../redux/ProfileDetails/ProfileAction";
import AuthAction from "../../redux/Auth/AuthAction";

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

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
  margin-top: ${Constants.statusBarHeight}px;
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

const Loading = () => (
  <ActivityIndicator color={theme.black} size={30} style={{ paddingTop: 5 }} />
);

const Login = ({ navigation }) => {
  const Dispatch = useDispatch();
  const fetchData = async () => {
    const uid = await SecureStore.getItemAsync("user");
    firebase
      .database()
      .ref(`/users/${uid}`)
      .once("value", (snap) => {
        Dispatch(ProfileAction(snap.val()));
      });
  };

  const [password, _setPassword] = React.useState("");
  const [email, _setEmail] = React.useState("");
  const [login, _setLogin] = React.useState("LOGIN");
  const GetStartedFunction = () => {
    if (email === "" || password === "") {
      return Alert.alert(
        "Go-Vid",
        "Please Provide your both password and email.",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else if (ValidateEmail(email) === false) {
      return Alert.alert(
        "Go-Vid",
        "Please Provide a valid email.",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else {
      _setLogin(<Loading />);
      firebase
        .auth()
        .signInWithEmailAndPassword(email.toLowerCase(), password)
        .then(async (id) => {
          const uid = id.user.uid;
          await SecureStore.setItemAsync("user", uid);
          await SecureStore.setItemAsync("login", "true");
          Dispatch(AuthAction(true));
          fetchData();
          navigation.navigate("homeApp", { screen: "home" });
        })
        .catch((e) => {
          return Alert.alert(
            "Go-Vid",
            `Error:${e}`,
            [
              {
                text: "OK",
                style: "cancel",
                onPress: () => navigation.goBack(),
              },
            ],
            { cancelable: false }
          );
        });
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
          size={40}
          name="add-circle"
        />
        <Heading>Login</Heading>
        <Input
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          placeholderTextColor={theme.grey}
          onChangeText={(e) => _setEmail(e)}
          keyboardType={
            Platform.OS === "ios" ? "ascii-capable" : "visible-password"
          }
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(e) => _setPassword(e)}
          placeholderTextColor={theme.grey}
          keyboardType={Platform.OS === "ios" ? "ascii-capable" : "email"}
          autoCapitalize="none"
        />
        <Touch onPress={() => GetStartedFunction()}>
          <GetStarted labelStyle={{ fontWeight: "bold", color: theme.black }}>
            {login}
          </GetStarted>
        </Touch>
        <View />
      </ScrollView>
    </Container>
  );
};
export default Login;
