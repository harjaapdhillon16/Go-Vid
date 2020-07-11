import React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DoubleClick from "react-native-double-tap";
import theme from "../../utils/theme";
import { Text } from "react-native-paper";

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
const ProfileImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid ${theme.primaryColor};
`;

const TextView = styled.View`
  position: absolute;
  left: 5px;
  bottom: 50px;
`;
const Username = styled(Text)`
  font-weight: bold;
  font-size: 15px;
  color: ${theme.white};
`;

const Captions = styled(Text)`
  font-size: 12px;
  color: ${theme.white};
  width: 75%;
`;
// class VideoPost extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       playState: false,
//       heartState: true,
//       likedState: false,
//       favorite: false,
//     };
//   }

//   PauseAndPlay = () => {
//     this.state.playState
//       ? this.reference.pauseAsync()
//       : this.reference.playAsync();
//     this.setState({ playState: !this.state.playState });
//   };
//   componentDidMount() {
//     this.reference.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
//   }

//   Like = async () => {
//     await this.setState({ heartState: false });
//     this.setState({ likedState: true });
//     setTimeout(async () => {
//       await this.setState({ heartState: true });
//     }, 400);
//   };

//   Play() {
//     this.setState({ playState: true });
//     this.reference.playAsync();
//   }

//   Pause() {
//     this.setState({ playState: false });
//     this.reference.pauseAsync();
//   }

//   _onPlaybackStatusUpdate = (playbackStatus) => {
//     if (!playbackStatus.isLoaded) {
//       // Update your UI for the unloaded state
//       if (playbackStatus.error) {
//         console.log(
//           `Encountered a fatal error during playback: ${playbackStatus.error}`
//         );
//         // Send Expo team the error on Slack or the forums so we can help you debug!
//       }
//     } else {
//       if (this.props.index === this.props.playing) {
//         this.Play();
//       }

//       if (playbackStatus.isPlaying) {
//         // Update your UI for the playing state
//       } else {
//         // Update your UI for the paused state
//       }

//       if (playbackStatus.isBuffering) {
//         // Update your UI for the buffering state
//       }

//       if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
//         // The player has just finished playing and will stop. Maybe you want to play something else?
//       }
//     }
//   };

//   render() {
//     const { playState, heartState, likedState, favorite } = this.state;

//     const { username, link } = this.props;
//     return (
//       <Container>
//         <DoubleClick
//           singleTap={() => {
//             this.PauseAndPlay();
//           }}
//           doubleTap={() => {
//             this.Like();
//           }}
//           delay={200}
//         >
//           <VideoView style={{ flex: 1 }}>
//             <VideoStyled
//               shouldPlay={playState}
//               isLooping
//               resizeMode="cover"
//               ref={(ref) => (this.reference = ref)}
//               source={require("../../assets/video3.mp4")}
//             />
//             <PlayIcon
//               playState={playState}
//               size={100}
//               name="play-arrow"
//               color={"white"}
//             />
//             <HeartIcon
//               playState={heartState}
//               size={100}
//               color={theme.red}
//               name="favorite"
//             />
//           </VideoView>
//         </DoubleClick>
//         <IconView>
//           <ProfileImage
//             source={{
//               uri:
//                 "https://images.unsplash.com/photo-1588288850150-d4ad788fdcf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
//             }}
//           />
//           <Icons
//             onPress={() => this.setState({ likedState: !likedState })}
//             size={40}
//             name={likedState ? "favorite" : "favorite-border"}
//             color={"white"}
//           />
//           <Icons
//             onPress={() => this.props.snapToTop()}
//             size={35}
//             name="comment"
//             color={"white"}
//           />
//           <Icons
//             onPress={() => this.setState({ favorite: !favorite })}
//             size={40}
//             name={favorite ? "bookmark" : "bookmark-border"}
//             color={"white"}
//           />
//         </IconView>
//         <TextView>
//           <Username>{username}</Username>
//           <Captions> </Captions>
//         </TextView>
//       </Container>
//     );
//   }
// }
const VideoPost = ({
  playing,
  index,
  link,
  username,
  navigation,
  snapToTop,
}) => {
  let reference;
  const [playState, _setPlayState] = React.useState(false);
  const [heartState, _setHeartState] = React.useState(true);
  const [likedState, _setLikedState] = React.useState(false);
  const [favorite, _setFavoriteState] = React.useState(false);
  const [initialLoad, _setInitialLoad] = React.useState(false);

  const PauseAndPlay = () => {
    playState ? reference.pauseAsync() : reference.playAsync();
    _setPlayState(!playState);
  };

  const Like = async () => {
    await _setHeartState(false);
    _setLikedState(true);
    setTimeout(async () => {
      await _setHeartState(true);
    }, 400);
  };

  function Play() {
    _setPlayState(true);
    reference.playAsync();
  }

  function Pause() {
    setState(false);
    reference.pauseAsync();
  }

  React.useEffect(() => {
    reference.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  });
  const _onPlaybackStatusUpdate = (playbackStatus) => {
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

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
      } else {
        if (!initialLoad) {
          if (playing === index) {
            Play();
            _setInitialLoad(true);
          }
        }

        // Update your UI for the paused
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }
    }
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
      <IconView>
        <ProfileImage
          source={{
            uri:
              "https://images.unsplash.com/photo-1588288850150-d4ad788fdcf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
          }}
        />
        <Icons
          onPress={() => _setLikedState(!likedState)}
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
          onPress={() => _setFavoriteState(!favorite)}
          size={40}
          name={favorite ? "bookmark" : "bookmark-border"}
          color={"white"}
        />
      </IconView>
      <TextView>
        <Username>{username}</Username>
        <Captions> </Captions>
      </TextView>
    </Container>
  );
};
export default VideoPost;
