import React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Dimensions, Platform } from "react-native";
import { connect } from "react-redux";
import Lodash from "lodash.debounce";

import DoubleClick from "../DoubleTap/DoubleTap";
import theme from "../../utils/theme";
import VideoIconsAndText from "./VideoIconsAndText";
import Video1 from "../../assets/01.mp4";

const VideoStyled = styled(Video)`
  height: ${Dimensions.get("screen").height}px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const Container = styled.View`
  height: ${Dimensions.get("screen").height}px;
`;

const VideoView = styled.View`
  height: ${Dimensions.get("screen").height}px;
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

export default class VideoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playState: true,
      heartState: true,
      likedState: false,
      playing: false,
      loaded: false,
      initialLoad: false,
    };
    this.counter = 0;
  }

  componentDidUpdate() {
    if (this.state.playState === true) {
      if (this.props.index !== this.props.IndexState) {
        this.reference.pauseAsync();
      } else {
        this.reference.playAsync();
      }
    }
  }
  PauseAndPlay = () => {
    if (this.state.playState === true) {
      this.reference.pauseAsync();
      this.setState({ playState: false });
    } else {
      this.reference.playAsync();
      this.setState({ playState: true });
    }
  };

  Like = async () => {
    await this.setState({ heartState: false });
    this.setState({ likedState: true });
    setTimeout(async () => {
      await this.setState({ heartState: true });
    }, 400);
  };
  async componentDidMount() {
    await this.reference.setOnPlaybackStatusUpdate(
      this._onPlaybackStatusUpdate
    );
    this.play = Lodash(this.play, 1000);
  }
  async play(c) {
    if (c === 0) {
      this.counter += 1;
      await this.reference.playAsync();
      await console.log("playing");
    }
  }
  _onPlaybackStatusUpdate = async (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state
      // if (playbackStatus.isPlaying === false) {
      //   if (this.counter === 0 && this.props.home.no === this.props.index) {
      //     // await this.play(this.counter);
      //   }
      // }
      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }
    }
  };

  render() {
    const {
      index,
      username,
      snapToTop,
      caption,
      uri,
      likes,
      comments,
      url,
    } = this.props;
    const { playState, heartState, likedState, playing } = this.state;
    return (
      <Container>
        <DoubleClick
          singleTap={() => {
            this.PauseAndPlay();
          }}
          doubleTap={() => {
            this.Like();
          }}
          delay={200}
        >
          <VideoView style={{ flex: 1 }}>
            <VideoStyled
              isLooping
              shouldPlay={playing}
              resizeMode="cover"
              ref={(ref) => {
                this.reference = ref;
              }}
              source={Video1}
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
          _setLikedState={(e) => this.setState({ likedState: e })}
          likedState={likedState}
          caption={caption}
          username={username}
          uri={uri}
          comments={comments}
          likes={likes}
        />
      </Container>
    );
  }
}
