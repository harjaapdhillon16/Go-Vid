import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import theme from "../../utils/theme";

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

const Follow = ({ following, _setFollowing }) => (
  <>
    {following ? (
      <FollowingButton
        labelStyle={{ fontWeight: "bold", color: theme.black }}
        mode="contained"
        onPress={()=>_setFollowing(false)}
      >
        Following
      </FollowingButton>
    ) : (
      <FollowButton
        onPress={()=>_setFollowing(true)}
        labelStyle={{ fontWeight: "bold" }}
        mode="contained"
      >
        Follow
      </FollowButton>
    )}
  </>
);

const UserProfileActions = () => {
  const Navigation = useNavigation();
  const [following, _setFollowing] = React.useState(false);
  return (
    <Container>
      <Follow following={following} _setFollowing={_setFollowing} />
      <RowView>
        <Back onPress={() => Navigation.goBack()} mode="contained">
          Back
        </Back>
        <Options labelStyle={{ fontWeight: "bold" }} mode="contained">
          Options
        </Options>
      </RowView>
    </Container>
  );
};
export default UserProfileActions;
