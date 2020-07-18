import React from "react";
import styled from "styled-components/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Text, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Platform } from "react-native";

import theme from "../../utils/theme";
import { Video } from "expo-av";

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
  margin-bottom: 10px;
  opacity: 1;
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
}) => {
  const [favorite, _setFavoriteState] = React.useState(false);
  const [snackBar, _setSnackBar] = React.useState(false);
  const Navigation = useNavigation();
  return (
    <>
      <IconView>
        <NavigationToProfile onPress={() => Navigation.navigate("userProfile")}>
          <ProfileImage
            source={{
              uri: uri,
            }}
          />
        </NavigationToProfile>
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
          onPress={() => {
            if (!favorite) {
              _setSnackBar(true);
            }
            _setFavoriteState(!favorite);
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
            _setFavoriteState(!favorite);
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
