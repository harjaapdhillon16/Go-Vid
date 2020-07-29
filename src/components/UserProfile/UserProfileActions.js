import React from "react";
import styled from "styled-components/native";
import { Button, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "../../api/instance";
import { Alert } from "react-native";

import theme from "../../utils/theme";
import firebase from "../../../config";

const Container = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  justify-content: center;
`;

const FollowButton = styled(Button)`
  width: 92%;
  align-self: center;
  background-color: ${theme.red};
`;

const FollowingButton = styled(FollowButton)`
  background-color: ${theme.primaryColor};
`;

const Back = styled(Button)`
  width: 40%;
  align-self: center;
  margin-right: 2px;
  background-color: ${theme.blue};
`;

const Options = styled(Button)`
  width: 50%;
  align-self: center;
  margin-left: 2px;
  background-color: ${theme.red};
`;

const RowView = styled.View`
  flex-direction: row;
  padding-top: 5px;
  align-self: center;
`;

const Loading = () => <ActivityIndicator color={theme.primaryColor} />;

const Follow = ({ following, _setFollow, _setUnFollow }) => (
  <>
    {following ? (
      <FollowingButton
        labelStyle={{ fontWeight: "bold", color: theme.black }}
        mode="contained"
        onPress={() => _setUnFollow()}
      >
        Following
      </FollowingButton>
    ) : (
      <FollowButton
        onPress={() => _setFollow()}
        labelStyle={{ fontWeight: "bold" }}
        mode="contained"
      >
        Follow
      </FollowButton>
    )}
  </>
);

const UserProfileActions = ({ userID }) => {
  const Navigation = useNavigation();
  const [following, _setFollowing] = React.useState(false);
  const [fetched, _setFetched] = React.useState(false);
  React.useEffect(() => {
    if (fetched === false) {
      async function fetch() {
        const uid = await SecureStore.getItemAsync("user");
        if (uid !== null) {
          await firebase
            .database()
            .ref(`following/${uid}/${userID}`)
            .once("value", (snap) => {
              if (snap.val() === true) {
                _setFollowing(true);
                _setFetched(true);
              } else {
                _setFetched(true);
              }
            });
        } else {
          _setFetched(true);
        }
      }
      fetch();
    }
  });

  const FollowAction = async () => {
    _setFollowing(true);
    const uid = await SecureStore.getItemAsync("user");
    if (uid !== null) {
      axiosInstance.post("/follow", {
        uid: uid,
        userID: userID,
      });
    }
  };
  const UnFollowAction = async () => {
    _setFollowing(false);
    const uid = await SecureStore.getItemAsync("user");
    if (uid !== null) {
      axiosInstance.post("/unFollow", {
        uid: uid,
        userID: userID,
      });
    }
  };

  return (
    <Container>
      {fetched ? (
        <Follow
          following={following}
          _setFollow={() => FollowAction()}
          _setUnFollow={() => UnFollowAction()}
        />
      ) : (
        <Loading />
      )}

      <RowView>
        <Back
          onPress={() => {
            Navigation.goBack();
          }}
          mode="contained"
        >
          Back
        </Back>
        <Options
          onPress={() => {
            return Alert.alert(
              "Go-Vid",
              "We are rolling out with some incredible new features, while we do that you can enjoy the feed.",
              [
                {
                  text: "Yeah Awesome",
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          }}
          labelStyle={{ fontWeight: "bold" }}
          mode="contained"
        >
          Options
        </Options>
      </RowView>
    </Container>
  );
};
export default UserProfileActions;
