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

      NotificationsDb.once("value", async (data) => {
        const array = [];
        let counter = 0;
        data.forEach((snap) => {
          if (snap.val().image !== undefined) {
            counter += 1;
            let dataObj = {};
            dataObj.uid = snap.val().uid;
            dataObj.username = snap.val().username;
            dataObj.image = snap.val().image;
            dataObj.uri = snap.val().uri;
            dataObj.d = snap.ref.key;
            dataObj.notificationType = snap.val().notificationType;
            array.push(dataObj);
            console.log(dataObj,array)
            if (counter === Object.keys(data.val()).length) {
              _setNotifications([...array]);
              console.log(notifications);
            }
          }
        });
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
