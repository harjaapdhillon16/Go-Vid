import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import { Video } from "expo-av";
import { Dimensions } from "react-native";

import Video1 from "../../assets/video1main.mp4";
import Video2 from "../../assets/video1.mp4";
import Video3 from "../../assets/video3.mp4";

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const VideoFull = styled(Video)`
  width: ${(width * 33) / 100}px;
  height: ${height / 3}px;
`;

const Data = [Video1, Video2, Video3];

export default function OwnPosts() {
  return (
    <Container>
      <VideoFull
        shouldPlay
        resizeMode="cover"
        rate={1.0}
        isLooping
        isMuted={true}
        source={Video1}
      />
      <VideoFull
        rate={1.0}
        resizeMode="cover"
        isLooping
        isMuted={true}
        source={Video2}
      />
      <VideoFull
        rate={1.0}
        resizeMode="cover"
        isLooping
        isMuted={true}
        source={Video3}
      />
    </Container>
  );
}
