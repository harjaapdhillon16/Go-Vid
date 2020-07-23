import React from "react";
import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";
import { Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";

import AxiosInstance from "../../api/instance";
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

const Image = styled.Image`
  width: ${(width * 32) / 100}px;
  height: ${height / 3}px;
`;
const BorderView = styled.View`
  border: 2px solid ${theme.primaryColor};
  border-top-width: 0px;
  border-left-width: 1px;
  border-bottom-width: 0px;
  border-right-width: 1px;
`;

const Loading = () => (
  <ActivityIndicator
    color={theme.primaryColor}
    size={30}
    style={{ paddingTop: 20 }}
  />
);

export default function LikedPosts() {
  React.useEffect(() => {
    if (videoData.length === 0) {
      async function fetch() {
        const uid = await SecureStore.getItemAsync("user");
        let likes;
        await firebase
          .database()
          .ref(`favorite/${uid}/favorites`)
          .once("value", (snap) => {
            if (snap.val() === null) {
              _setLoading(null);
              return true;
            } else {
              const paginatedValue = snap.val();
              AxiosInstance.post("/favoritePost", {
                uid,
                paginatedValue,
              }).then((result) => {
                _setVideoData(result.data);
              });
            }
          });
      }
      fetch();
    }
  });
  const [videoData, _setVideoData] = React.useState([]);
  const [loading, _setLoading] = React.useState(<Loading />);
  return (
    <>
      <Container>
        {videoData.length === 0
          ? loading
          : videoData.map((item, index) => (
              <BorderView key={index}>
                <Image key={index} source={{ uri: item.image }} />
              </BorderView>
            ))}
      </Container>
    </>
  );
}
