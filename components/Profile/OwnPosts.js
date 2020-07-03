import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import { Video } from "expo-av";
import { Dimensions } from "react-native";

import Video1 from "../../assets/video.mp4";
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
        source={{
          uri:
            "https://vod-progressive.akamaized.net/exp=1593728657~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2427%2F15%2F387139746%2F1632272088.mp4~hmac=ab4eafddb811525282446d683c9f80acb26cec91aa4ab3e3bc3dd2f81d672014/vimeo-prod-skyfire-std-us/01/2427/15/387139746/1632272088.mp4?download=1&filename=video.mp4",
        }}
      />
      <VideoFull
        shouldPlay
        rate={1.0}
        resizeMode="cover"
        isLooping
        isMuted={true}
        source={{
          uri:
            "https://vod-progressive.akamaized.net/exp=1593728614~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1217%2F16%2F406088732%2F1739366552.mp4~hmac=ad43ad433f5d35627a03a2ae756fd9903c26dd3cf4934cf3b65abf9f17d44b90/vimeo-prod-skyfire-std-us/01/1217/16/406088732/1739366552.mp4?download=1&filename=production+ID%3A4115283.mp4",
        }}
      />
      <VideoFull
        shouldPlay
        rate={1.0}
        resizeMode="cover"
        isLooping
        isMuted={true}
        source={{
          uri:
            "https://vod-progressive.akamaized.net/exp=1593727449~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4606%2F15%2F398033943%2F1695458746.mp4~hmac=1f2c43f55198b222873b70889aed42c2ae77e5426b70f4de434a9f15a93bc48e/vimeo-prod-skyfire-std-us/01/4606/15/398033943/1695458746.mp4?download=1&filename=production+ID%3A3946082.mp4",
        }}
      />

    </Container>
  );
}
