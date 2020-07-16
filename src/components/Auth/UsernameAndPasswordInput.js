import React from "react";
import styled from "styled-components/native";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import Constants from "expo-constants";
import { Platform } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Alert, Keyboard } from "react-native";
import firebase from "../../../config";
import * as SecureStore from "expo-secure-store";
import Lodash from "lodash.debounce";

import UsernameApi from "../../api/usernameApi";
import UserCreate from "../../api/userCreate";
import theme from "../../utils/theme";

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

const UsernameView = styled.View`
  width: 80%;
  height: 50px;
  border: 1px solid ${theme.white};
  padding-left: 10px;
  flex-direction: row;
  border-radius: 10px;
`;
const UsernameInput = styled.TextInput`
  height: 50px;
  border-radius: 10px;
  width: 90%;
  align-self: flex-start;
  color: ${theme.white};
  padding-left: 10px;
  transform: translateX(-10px);
`;

const PasswordInput = styled(UsernameInput)``;
const PasswordView = styled(UsernameView)`
  margin-bottom: 5px;
`;
const PasswordIcon = styled(MaterialIcons)`
  transform: translateX(-7px);
  padding-top: 10px;
`;
const LoadingIndicator = styled(ActivityIndicator)`
  transform: translateX(-5px);
`;

const TextView = styled.View`
  height: 20px;
  justify-content: center;
`;

const Touch = styled.TouchableWithoutFeedback``;

const ViewButton = styled.View`
  flex-direction: row;
`;

const SuccessText = () => {
  return (
    <Text style={{ color: theme.primaryColor, fontSize: 12 }}>
      username is available
    </Text>
  );
};
const FailureText = () => {
  return (
    <Text style={{ color: theme.red, fontSize: 12 }}>
      username is unavailable
    </Text>
  );
};

class UsernameAndPasswordInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: false,
      status: false,
      password: "",
      confirmPassword: "",
      username: "",
      passwordVisible: true,
      confirmPasswordVisible: true,
      loader: "none",
    };
  }
  async Submit() {
    const { password, confirmPassword, status, username } = this.state;
    const { navigation } = this.props;
    if (password.length <= 5) {
      return Alert.alert(
        "Go-Vid",
        "Please create a password bigger than 6 characters",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
    if (password !== confirmPassword) {
      return Alert.alert(
        "Go-Vid",
        "Password and confirmed passwords don't match",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
    if (!status) {
      return Alert.alert(
        "Go-Vid",
        "Please use a valid username",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
    const email = await SecureStore.getItemAsync("email");
    const name = await SecureStore.getItemAsync("name");
    Keyboard.dismiss();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        if (Platform.OS === "ios") {
          this.setState({ loader: "block" });
        }
        const uid = user.user.uid;
        await SecureStore.setItemAsync("user", uid);
        UserCreate(email, uid, name, username);
        navigation.navigate("ProfilePicture");
      })
      .catch((err) => {
        Alert.alert(
          "Go-Vid",
          `${err}`,
          [
            {
              text: "OK",
              style: "cancel",
              onPress: () => navigation.navigate("homeApp", { screen: "home" }),
            },
          ],
          { cancelable: false }
        );
      });
  }

  ApiUsername = async (user) => {
    const result = await UsernameApi(user);
    if (result) {
      this.setState({ success: <SuccessText /> });
      this.setState({ loading: false });
      this.setState({ status: true });
    } else {
      this.setState({ success: <FailureText /> });
      this.setState({ loading: false });
    }
  };

  async UsernameCheck(user) {
    this.setState({ status: false });
    this.setState({ success: null });
    if (user.length > 1) {
      await this.setState({ loading: true });
      await this.setState({ username: user });
      this.ApiUsername(user);
    } else {
      this.setState({ loading: false });
      await this.setState({ username: user });
    }
  }
  componentDidMount() {
    this.ApiUsername = Lodash(this.ApiUsername, 1000);
  }
  render() {
    const { passwordVisible, confirmPasswordVisible } = this.state;
    return (
      <>
        <Heading>Set a password and a username.</Heading>
        <PasswordView>
          <PasswordInput
            placeholder="Password"
            value={this.state.password}
            placeholderTextColor={theme.grey}
            onChangeText={(e) => this.setState({ password: e })}
            keyboardType={Platform.OS === "ios" ? "ascii-capable" : "default"}
            autoCapitalize="none"
            secureTextEntry={passwordVisible}
          />
          <PasswordIcon
            name={passwordVisible ? "visibility" : "visibility-off"}
            size={25}
            color={theme.white}
            onPress={() => {
              this.setState({ passwordVisible: !passwordVisible });
            }}
          />
        </PasswordView>
        <PasswordView>
          <PasswordInput
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChangeText={(e) => this.setState({ confirmPassword: e })}
            placeholderTextColor={theme.grey}
            keyboardType={Platform.OS === "ios" ? "ascii-capable" : "default"}
            secureTextEntry={confirmPasswordVisible}
            autoCapitalize="none"
          />
          <PasswordIcon
            onPress={() =>
              this.setState({ confirmPasswordVisible: !confirmPasswordVisible })
            }
            name={confirmPasswordVisible ? "visibility" : "visibility-off"}
            size={25}
            color={theme.white}
          />
        </PasswordView>
        <UsernameView>
          <UsernameInput
            placeholder="Username"
            value={this.state.username}
            onChangeText={(e) => this.UsernameCheck(e)}
            placeholderTextColor={theme.grey}
            maxLength={20}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
            autoCapitalize="none"
          />
          {this.state.loading ? (
            <LoadingIndicator animating={true} color={theme.primaryColor} />
          ) : null}
        </UsernameView>
        <TextView>{this.state.success}</TextView>
        <Touch onPress={() => this.Submit()}>
          <ViewButton>
            <GetStarted labelStyle={{ fontWeight: "bold", color: theme.black }}>
              Confirm
            </GetStarted>
            <LoadingIndicator
              animating={true}
              style={{ display: this.state.loader }}
              color={theme.primaryColor}
            />
          </ViewButton>
        </Touch>
        <View />
      </>
    );
  }
}



export default UsernameAndPasswordInput;
