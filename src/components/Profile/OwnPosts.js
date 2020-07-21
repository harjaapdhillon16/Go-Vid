import React from "react";
import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";
import { Video } from "expo-av";
import { Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";

import Video1 from "../../assets/video1main.mp4";
import Video2 from "../../assets/video1.mp4";
import Video3 from "../../assets/video3.mp4";

import theme from "../../utils/theme";
import firebase from "../../../config";

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background-color: ${theme.black};
`;

const ContainerTop = styled.View`
  align-items: center;
  border: 0px solid ${theme.white};
  border-top-width: 1px;
`;

const Image = styled.Image`
  width: ${(width * 33) / 100}px;
  height: ${height / 3}px;
`;
const BorderView = styled.View`
  border: 2px solid ${theme.primaryColor};
  border-top-width:0px;
  border-left-width: 1px;
  border-bottom-width:0px;
  border-right-width: 1px;
`;

const Data = [Video1, Video2, Video3];

const Loading = () => (
  <ActivityIndicator
    color={theme.primaryColor}
    size={30}
    style={{ alignSelf: "center", paddingLeft: "45%", paddingTop: 20 }}
  />
);

const UserMedia = () => {
  React.useEffect(() => {
    async function fetch() {
      const uid = await SecureStore.getItemAsync("user");
      await firebase
        .database()
        .ref(`posts/${uid}`)
        .limitToLast(10)
        .once("value", (snap) => {
          _setVideoData([...snap.val()]);
        });
    }
    fetch();
  });
  const [videoData, _setVideoData] = React.useState([]);
  return (
    <>
      <Container>
        {videoData.length === 0 ? (
          <Loading />
        ) : (
          videoData.map((item) => (
            <BorderView>
              <Image source={{ uri: item.image }} />
            </BorderView>
          ))
        )}
      </Container>
    </>
  );
};
export default UserMedia;
