import React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import DoubleClick from "../DoubleTap/DoubleTap";
import theme from "../../utils/theme";
import VideoIconsAndText from "./VideoIconsAndText";

const VideoStyled = styled(Video)`
  height: ${Dimensions.get('screen').height}px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const Container = styled.View`
  height: ${Dimensions.get('screen').height}px;
`;

const VideoView = styled.View`
  height: ${Dimensions.get('screen').height}px;
`;

const PlayIcon = styled(MaterialIcons)`
  opacity: ${(props) => (props.playState ? 0 : 0.6)};
  position: absolute;
  top: 40%;
  align-self: center;
`;
const HeartIcon = styled(PlayIcon)`
  opacity: ${(props) => (props.playState ? 0 : 1)};
`;

const VideoPost = ({ index, link, username, snapToTop, caption }) => {
  let reference;
  const [playState, _setPlayState] = React.useState(true);
  const [heartState, _setHeartState] = React.useState(true);
  const [likedState, _setLikedState] = React.useState(false);
  const [playing, _setPlaying] = React.useState(false);

  const IndexState = useSelector((state) => state.no);

  const Navigation = useNavigation();
  Navigation.addListener("blur", () => {
    _setPlayState(false);
    _setPlaying(false);
  });
  Navigation.addListener("focus", () => {
    if (IndexState === index) {
      _setPlayState(true);
      _setPlaying(true);
    }
  });
  React.useEffect(() => {
    if (IndexState === index) {
      _setPlaying(true);
      _setPlayState(true);
      reference.playAsync();
    } else {
      reference.pauseAsync();
      _setPlaying(false);
    }
  }, [IndexState]);

  const PauseAndPlay = () => {
    playState ? reference.pauseAsync() : reference.playAsync();
    _setPlaying(!playing);
    _setPlayState(!playState);
  };

  const Like = async () => {
    await _setHeartState(false);
    _setLikedState(true);
    setTimeout(async () => {
      await _setHeartState(true);
    }, 400);
  };

  return (
    <Container>
      <DoubleClick
        singleTap={() => {
          PauseAndPlay();
        }}
        doubleTap={() => {
          Like();
        }}
        delay={200}
      >
        <VideoView style={{ flex: 1 }}>
          <VideoStyled
            shouldPlay={playing}
            isLooping
            resizeMode="cover"
            ref={(ref) => (reference = ref)}
            source={require("../../assets/video1main.mp4")}
          />
          <PlayIcon
            playState={playState}
            size={100}
            name="play-arrow"
            color={"white"}
          />
          <HeartIcon
            playState={heartState}
            size={100}
            color={theme.red}
            name="favorite"
          />
        </VideoView>
      </DoubleClick>
      <VideoIconsAndText
        snapToTop={snapToTop}
        _setLikedState={_setLikedState}
        likedState={likedState}
        caption={caption}
        username={username}
      />
    </Container>
  );
};
export default VideoPost;
