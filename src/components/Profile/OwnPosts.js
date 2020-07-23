import React from "react";
import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";
import { Video } from "expo-av";
import { Dimensions, View } from "react-native";
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
  height: 100%;
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
  border-top-width: 0px;
  border-left-width: 1px;
  border-bottom-width: 0px;
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
const Heading = styled(Text)`
  color: ${theme.white};
  align-self: center;
  text-align:center;
  padding:20px;
`;

const UserMedia = () => {
  React.useEffect(() => {
    if (Fetched === false) {
      async function fetch() {
        const uid = await SecureStore.getItemAsync("user");
        await firebase
          .database()
          .ref(`posts/${uid}`)
          .orderByChild(`index`)
          .startAt(0)
          .endAt(1)
          .once("value", (snap) => {
            const postData = [];
            snap.forEach((data, index) => {
              const UniqueKey = data.ref.key;
              const post = snap.val();
              postData.push(post[data.ref.key]);
            });
            _setVideoData(postData);
          });
      }
      _setFetched(true);
      fetch();
    }
  });
  const [videoData, _setVideoData] = React.useState([]);
  const [Fetched, _setFetched] = React.useState(false);
  return (
    <>
      <Container>
        {videoData.length === 0 ? (
          <>
            {Fetched ? (
              <Heading>User hasn't posted any videos yet</Heading>
            ) : (
              <Loading />
            )}
          </>
        ) : (
          videoData.map((item, index) => (
            <BorderView key={index}>
              <Image key={index} source={{ uri: item.image }} />
            </BorderView>
          ))
        )}
      </Container>
    </>
  );
};
export default UserMedia;
