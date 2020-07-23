import React from "react";
import styled from "styled-components/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Text, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

import theme from "../../utils/theme";
import { Video } from "expo-av";

import firebase from "../../../config";

const { width } = Dimensions.get("screen");

const ProfileImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

const TextView = styled.View`
  position: absolute;
  left: 5px;
  bottom: ${Platform.OS === "android" ? "14%" : "50px"};
`;
const Username = styled(Text)`
  font-weight: bold;
  font-size: 15px;
  color: ${theme.white};
`;

const Captions = styled(Text)`
  font-size: 12px;
  color: ${theme.white};
  width: ${(width * 75) / 100}px;
  margin-top: ${(props) => (props.caption ? "2px" : "0px")};
`;
const IconView = styled.View`
  position: absolute;
  bottom: ${Platform.OS === "android" ? "20%" : "10%"};
  right: 5px;
`;
const Icons = styled(MaterialIcons)`
  margin-bottom: 3px;
  opacity: 1;
`;
const Numbers = styled(Text)`
  color: ${theme.white};
  font-size: 15px;
  align-self: center;
  margin-bottom: 5px;
`;

const NavigationToProfile = styled.TouchableWithoutFeedback``;

const VideoIconsAndText = ({
  snapToTop,
  _setLikedState,
  likedState,
  username,
  caption,
  uri,
  likes,
  comments,
  uid,
  likeAction,
  unlikeAction,
  postNo
}) => {
  const [favorite, _setFavoriteState] = React.useState(false);
  const [snackBar, _setSnackBar] = React.useState(false);
  const Navigation = useNavigation();

  const Favorite = async () => {
    let index;
    if (favorite === false) {
      _setFavoriteState(true);

      const userID = uid;
      const currentUser = await SecureStore.getItemAsync("user");
      if (currentUser !== null) {
        await firebase
          .database()
          .ref(`favorite/${currentUser}/favorites`)
          .once("value", (data) => {
            index = data.val();
            if (index === null) {
              index = 0;
            }
            firebase
              .database()
              .ref(`favorite/${currentUser}/favorites`)
              .set(index + 1);
          });
      }
      currentUser !== null
        ? firebase
            .database()
            .ref(`favorite/${currentUser}/${postNo}__${userID}`)
            .set({
              index: index + 1,
            })
        : null;
    }
  };
  const UnFavorite = async () => {
    let index;
    if (favorite === true) {
      _setFavoriteState(false);

      const userID = uid;
      const currentUser = await SecureStore.getItemAsync("user");
      if (currentUser !== null) {
        await firebase
          .database()
          .ref(`favorite/${currentUser}/favorites`)
          .once("value", (data) => {
            index = data.val();
            if (index === null) {
              index = 0;
            }
            firebase
              .database()
              .ref(`favorite/${currentUser}/favorites`)
              .set(index - 1);
          });
      }
      currentUser !== null
        ? firebase
            .database()
            .ref(`favorite/${currentUser}/${postNo}__${userID}`)
            .remove()
        : null;
    }
  };

  return (
    <>
      <IconView>
        <NavigationToProfile
          onPress={() =>
            Navigation.navigate("userProfile", {
              uid: uid,
              username: username,
              uri: uri,
              routed: true,
            })
          }
        >
          <ProfileImage source={{ uri: uri }} />
        </NavigationToProfile>
        <Icons
          onPress={() => {
            if (likedState === true) {
              _setLikedState(false);
              unlikeAction();
            } else {
              _setLikedState(true);
              likeAction();
            }
          }}
          size={40}
          name={likedState ? "favorite" : "favorite-border"}
          color={"white"}
        />
        <Numbers>{likes}</Numbers>

        <Icons
          onPress={() => {
            if (!favorite) {
              Favorite();
              _setSnackBar(true);
            } else {
              UnFavorite();
            }
          }}
          size={40}
          name={favorite ? "bookmark" : "bookmark-border"}
          color={"white"}
        />
      </IconView>
      <TextView>
        <Username>{username}</Username>
        <Captions caption={caption}>{caption} </Captions>
      </TextView>
      <Snackbar
        visible={snackBar}
        onDismiss={() => _setSnackBar(false)}
        action={{
          label: "Undo",
          onPress: () => {
            UnFavorite();
          },
        }}
        duration={1000}
        style={{
          width: "90%",
          zIndex: 4,
          elevation: 3,
          marginBottom: Platform.OS === "android" ? "55%" : 50,
        }}
      >
        Added to Favorites
      </Snackbar>
    </>
  );
};
export default VideoIconsAndText;
