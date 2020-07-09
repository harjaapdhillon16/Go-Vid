import React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DoubleClick from "react-native-double-tap";
import theme from "../../utils/theme";

const VideoStyled = styled(Video)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const Container = styled.View`
  flex: 1;
`;
const IconView = styled.View`
  position: absolute;
  bottom: 10%;
  right: 5px;
`;
const Icons = styled(MaterialIcons)`
  margin-bottom: 10px;
  opacity: 1;
`;

const VideoView = styled.View`
  flex: 1;
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
const TouchableWithoutFeedBack = styled.TouchableWithoutFeedback``;

const VideoPost = ({ snapToTop }) => {
  let reference;
  const [playState, _setPlayState] = React.useState(true);
  const [heartState, _setHeartState] = React.useState(true);
  const [likedState, _setlikedState] = React.useState(false);
  const [favorite, _setFavorite] = React.useState(false);
  const PauseAndPlay = () => {
    playState ? reference.pauseAsync() : reference.playAsync();
    _setPlayState(!playState);
  };
  const Like = async () => {
    await _setHeartState(false);
    _setlikedState(true);
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
            shouldPlay={playState}
            isLooping
            resizeMode="cover"
            ref={(ref) => (reference = ref)}
            source={{
              uri:
                "https://vod-progressive.akamaized.net/exp=1594321264~acl=%2A%2F1192170405.mp4%2A~hmac=69cc73c86f6dbccc70c7f0c77d1c942f6efc44e5ecf685685d5e7335d4993986/vimeo-prod-skyfire-std-us/01/1979/12/309899172/1192170405.mp4?download=1&filename=Pexels+Videos+1769350.mp4",
            }}
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
      <IconView>
        <Icons
          onPress={() => _setlikedState(!likedState)}
          size={40}
          name={likedState ? "favorite" : "favorite-border"}
          color={"white"}
        />
        <Icons
          onPress={() => snapToTop()}
          size={35}
          name="comment"
          color={"white"}
        />
        <Icons
          onPress={() => _setFavorite(!favorite)}
          size={40}
          name={favorite ? "bookmark" : "bookmark-border"}
          color={"white"}
        />
      </IconView>
    </Container>
  );
};
export default VideoPost;
