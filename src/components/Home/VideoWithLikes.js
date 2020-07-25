import React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Dimensions, Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

import axiosInstance from "../../api/instance";

import DoubleClick from "../DoubleTap/DoubleTap";
import theme from "../../utils/theme";
import VideoIconsAndText from "./VideoIconsAndText";
import Video1 from "../../assets/01.mp4";
import firebase from "../../../config";

const height = Dimensions.get("screen").height;

const VideoStyled = styled(Video)`
  height: ${height}px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const Container = styled.View`
  height: ${height}px;
`;

const VideoView = styled.View`
  height: ${height}px;
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
      playing: true,
      loaded: false,
      initialLoad: false,
      likes: this.props.data.likes,
    };
  }

  componentDidUpdate() {
    const { navigation } = this.props;

    if (navigation.isFocused() === true) {
      if (this.state.playState === true) {
        if (this.props.index !== this.props.indexState) {
          this.reference.pauseAsync();
          if (this.state.playing === false) {
            this.setState({ playing: true });
          }
        } else {
          if (this.state.playing === true) {
            this.reference.playFromPositionAsync(0);
          }
        }
      }
    }

    navigation.addListener("focus", () => {
      if (this.state.initialLoad === true) {
        if (
          this.props.index === this.props.indexState &&
          this.state.playState
        ) {
          console.log();
          this.reference.playAsync();
        }
      }
    });
    navigation.addListener("blur", () => {
      this.reference.pauseAsync();
    });
  }
  PauseAndPlay = () => {
    if (this.state.playState === true) {
      this.reference.pauseAsync();
      this.setState({ playState: false });
      this.setState({ playing: false });
    } else {
      this.reference.playAsync();
      this.setState({ playState: true });
      this.setState({ playing: false });
    }
  };

  Like = async () => {
    this.setState({ playing: false });
    this.likedApi();
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
  }

  async likedApi() {
    const { uid, postNo } = this.props.data;
    const { likedState, likes } = this.state;
    let index;
    if (likedState === false) {
      this.setState({ likes: likes + 1 });
      const LikesDatabase = firebase.database().ref(`users/${uid}/likes`);
      LikesDatabase.once("value", (snap) => {
        LikesDatabase.set(snap.val() + 1);
      });
      const route = `posts/${uid}/${postNo}/likes`;
      await firebase
        .database()
        .ref(route)
        .once("value", async (snap) => {
          firebase
            .database()
            .ref(route)
            .set(snap.val() + 1);

          const userID = this.props.data.uid;
          const uid = await SecureStore.getItemAsync("user");

          await firebase
            .database()
            .ref(`liked/${uid}/likes`)
            .once("value", (data) => {
              index = data.val();
              if (index === null) {
                index = 0;
              }
              firebase
                .database()
                .ref(`liked/${uid}/likes`)
                .set(index + 1);
            });

          uid !== null
            ? firebase
                .database()
                .ref(`liked/${uid}/${postNo}__${userID}`)
                .set({
                  index: index + 1,
                })
            : null;
          uid !== null
            ? axiosInstance.post("/notifications", {
                user: uid,
                uid: userID,
                notificationType: "like",
                username: this.props.data.username,
                uri: this.props.data.image,
                image: this.props.data.uri,
              })
            : null;
        });
    }
  }
  async Unlike() {
    const { uid, postNo } = this.props.data;
    const { likedState, likes } = this.state;
    if (likedState === true) {
      this.setState({ likes: likes - 1 });
      const LikesDatabase = firebase.database().ref(`users/${uid}/likes`);
      LikesDatabase.once("value", (snap) => {
        LikesDatabase.set(snap.val() - 1);
      });
      const route = `posts/${uid}/${postNo}/likes`;
      await firebase
        .database()
        .ref(route)
        .once("value", async (snap) => {
          firebase
            .database()
            .ref(route)
            .set(snap.val() - 1);
          const uid = await SecureStore.getItemAsync("user");
          const userID = this.props.data.uid;
          firebase.database().ref(`notifications/${uid}/${userID}`).remove();
          uid !== null
            ? firebase
                .database()
                .ref(`liked/${uid}/${postNo}__${userID}`)
                .remove()
            : null;
        });
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
      if (this.props.no === undefined) {
        if (this.state.initialLoad === false) {
          if (this.props.index === 0) {
            await this.reference.playAsync();
          }
          this.setState({ initialLoad: true });
        }
      } else {
        if (this.state.initialLoad === false) {
          if (this.props.index === this.props.no) {
            await this.reference.playAsync();
          }
          this.setState({ initialLoad: true });
        }
      }
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
      comments,
      url,
      uid,
      postNo,
    } = this.props.data;
    const { playState, heartState, likedState, playing, likes } = this.state;
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
              resizeMode="cover"
              ref={(ref) => {
                this.reference = ref;
              }}
              source={{ uri: url }}
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
          uid={uid}
          snapToTop={snapToTop}
          _setLikedState={(e) => this.setState({ likedState: e })}
          likedState={likedState}
          likeAction={() => this.likedApi()}
          unlikeAction={() => this.Unlike()}
          caption={caption}
          username={username}
          uri={uri}
          postNo={postNo}
          likes={likes}
          comments={comments}
          likes={likes}
        />
      </Container>
    );
  }
}
