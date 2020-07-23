import React from "react";
import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";
import { Video } from "expo-av";
import { Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Video1 from "../../assets/video1main.mp4";
import Video2 from "../../assets/video1.mp4";
import Video3 from "../../assets/video3.mp4";

import theme from "../../utils/theme";
import firebase from "../../../config";

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width:100%;
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

const Data = [Video1, Video2, Video3];

const Loading = () => (
  <ActivityIndicator
    color={theme.primaryColor}
    size={30}
    style={{ alignSelf:'center',paddingLeft:"45%",paddingTop:20 }}
  />
);

const UserMedia = ({ uid }) => {
  React.useEffect(() => {
    if (Fetched === false) {
      async function fetch() {
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
      <ContainerTop>
        <MaterialIcons
          style={{ padding: 4 }}
          color={theme.white}
          name="perm-media"
          size={25}
        />
      </ContainerTop>
      <Container>
        {videoData.length === 0 ? (
          <Loading />
        ) : (
          videoData.map((item) => (
            <Image
              source={{ uri: item.image }}
            />
          ))
        )}
      </Container>
    </>
  );
};
export default UserMedia;
