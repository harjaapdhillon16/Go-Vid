import React from "react";
import styled from "styled-components/native";
import { TextInput, Text } from "react-native-paper";
import { TextInput as ReactInput } from "react-native";

import theme from "../../utils/theme";

const Container = styled.View`
  padding-bottom: 300px;
  padding-top: 20px;
`;
const Input = styled(TextInput)`
  background-color: ${theme.lightBlack};
  width: 80%;
  align-self: center;
  height: 20px;
  font-size: 15px;
  padding: 10px;
  margin-top: 5px;
`;
const SmallText = styled(Text)`
  color: ${theme.white};
  width: 80%;
  align-self: center;
  font-weight: bold;
`;
const MultipleLines = styled(ReactInput)`
  background-color: ${theme.lightBlack};
  width: 80%;
  align-self: center;
  padding: 10px;
  color: ${theme.white};
  padding-left: 20px;
`;

const EditDetails = ({ name, username, bio }) => {
  const [nameState, _setName] = React.useState(name);
  const [usernameState, _setUsername] = React.useState(username);
  const [bioState, _setBio] = React.useState(bio);
  return (
    <Container>
      <SmallText>Name</SmallText>
      <Input
        theme={{
          colors: {
            text: theme.white,
            primary: theme.primaryColor,
            underlineColor: theme.white,
          },
        }}
        value={nameState}
      />
      <SmallText style={{ paddingTop: 10 }}>Username</SmallText>
      <Input
        theme={{
          colors: {
            text: theme.white,
            primary: theme.primaryColor,
            underlineColor: theme.white,
          },
        }}
        value={usernameState}
      />
      <SmallText style={{ paddingTop: 10 }}>Bio</SmallText>
      <MultipleLines multiline={true} numberOfLines={4} value={bioState} />
    </Container>
  );
};
export default EditDetails;
