import React from "react";
import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";
import { Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import AxiosInstance from "../../api/instance";
import theme from "../../utils/theme";
import firebase from "../../../config";
import VideoViewAction from "../../redux/VideoView/VideoViewAction";

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

const Touch = styled.TouchableWithoutFeedback``;


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
          .ref(`liked/${uid}/likes`)
          .once("value", (snap) => {
            if (snap.val() === null) {
              _setLoading(null);
              return true;
            } else {
              const paginatedValue = snap.val();
              AxiosInstance.post("/likedPost", {
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

  const Dispatch = useDispatch();
  const navigation = useNavigation();

  const NavigateToVideoView = async (index) => {
    Dispatch(VideoViewAction(videoData, index));
    // console.log(videoData)
    navigation.navigate("videoView");
  };
  return (
    <>
      <Container>
        {videoData.length === 0
          ? loading
          : videoData.map((item, index) => (
            <Touch onPress={() => NavigateToVideoView(index)}>
              <BorderView key={index}>
                <Image key={index} source={{ uri: item.image }} />
              </BorderView>
            </Touch>
            ))}
      </Container>
    </>
  );
}
