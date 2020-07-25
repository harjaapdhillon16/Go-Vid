import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { StatusBar, setStatusBarHidden } from "expo-status-bar";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";

import NotificationComponent from "../../components/Notifications/NotificationComponent";
import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

import firebase from "../../../config";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;

const Heading = styled(Title)`
  color: ${theme.white};
  padding: 10px;
  padding-top: 0px;
  font-weight: bold;
`;

const Notifications = ({ navigation }) => {
  React.useEffect(() => {
    navigation.addListener("focus", () => setStatusBarHidden(false, "none"));
  });

  const Profile = useSelector((state) => state.profile);

  React.useEffect(() => {
    listen();
  }, [Profile]);

  const [fetched, _setFetched] = React.useState(false);

  async function listen() {
    if (Profile.uid !== "") {
      const NotificationsDb = firebase
        .database()
        .ref(`notifications/${Profile.uid}`);
      console.log(Profile.uid);


      NotificationsDb.on("child_added", async (snap) => {
        console.log(snap.val());
        if (snap.val().image !== undefined) {
          let data = {};
          data.uid = snap.val().key;
          data.username = snap.val().username;
          data.image = snap.val().image;
          data.uri = snap.val().uri;
          data.notificationType = snap.val().notificationType;
          let array = notifications;
          array.push(data);
          if ([data] !== notifications) {
            console.log(data);
            await _setNotifications([...array]);
          }
        }
      });
    } else {
      firebase.database().ref().off();
      console.log("subscribe off");
    }
    _setFetched(true);
  }

  const [notifications, _setNotifications] = React.useState([]);
  return (
    <Container>
      <StatusBar style="light" />
      <Heading>Notifications</Heading>
      {notifications.map((item, index) => (
        <NotificationComponent data={item} key={index} />
      ))}
      <BottomNavigationBar />
    </Container>
  );
};
export default Notifications;
