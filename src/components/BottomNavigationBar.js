import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import MaterialDesign from "react-native-vector-icons/MaterialIcons";
import theme from "../utils/theme";
import { Alert } from "react-native";
import { TouchableWithoutFeedback, Platform } from "react-native";
import { useSelector } from "react-redux";

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  padding-bottom: 5px;
  background-color: ${(props) =>
    props.homeScreen ? "transparent" : theme.lightBlack};
  border: 0px solid ${theme.grey};
  border-top-width: 0.3px;
  padding-top: 5px;
  transform: ${(props) =>
    props.homeScreen
      ? Platform.OS === "android"
        ? "translateY(-50px)"
        : ""
      : ""};
`;
const IconView = styled.View`
  width: 20%;
  align-items: center;
`;

const BottomNavigationBar = ({ homeScreen, androidHomeScreen }) => {
  const Auth = useSelector((state) => state.auth.AuthValue);

  const UploadNavigate = () => {
    if (Auth) {
      navigation.navigate("UploadCombine");
    } else {
      return Alert.alert(
        "Go-Vid",
        "You need to login or signup in order to upload posts.",
        [
          {
            text: "Yeah Awesome",
            style: "cancel",
          },
        ],
        { cancelable: false },
      );
    }
  };
  const navigation = useNavigation();
  return (
    <Container androidHomeScreen={androidHomeScreen} homeScreen={homeScreen}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("home")}>
        <IconView>
          <MaterialDesign
            name='home'
            color={homeScreen ? theme.white : theme.white}
            size={30}
          />
        </IconView>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("search")}>
        <IconView>
          <MaterialDesign
            name='search'
            color={homeScreen ? theme.white : theme.white}
            size={30}
          />
        </IconView>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => UploadNavigate()}>
        <IconView>
          <MaterialDesign name='backup' color={theme.primaryColor} size={30} />
        </IconView>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("notifications")}
      >
        <IconView>
          <MaterialDesign
            name='notifications-none'
            color={homeScreen ? theme.white : theme.white}
            size={30}
          />
        </IconView>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("profile")}>
        <IconView>
          <MaterialDesign
            name='person'
            color={homeScreen ? theme.white : theme.white}
            size={30}
          />
        </IconView>
      </TouchableWithoutFeedback>
    </Container>
  );
};
export default BottomNavigationBar;
