import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import { Dimensions } from "react-native";

import theme from "./../../utils/theme";

const { width } = Dimensions.get("screen");

const Container = styled.View`
  background-color: ${theme.lightBlack};
  width: 95%;
  align-self: center;
  padding: 10px 0px;
  flex-direction: row;
  border-radius: 30px;
`;
const Name = styled(Text)`
  color: ${theme.white};
  font-size: 18px;
  width: ${width - 100}px;
`;

const Username = styled(Text)`
  color: ${theme.primaryColor};
`;
const Image = styled.Image`
  width: 50px;
  align-self: center;
  border-radius: 100px;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
`;
const ColumnView = styled.View``;

const UserCard = ({ Data }) => {
  return (
    <Container>
      <Image
        source={{
          uri: Data.uri,
        }}
      />
      <ColumnView>
        <Name>{Data.name}</Name>
        <Username>@{Data.username}</Username>
      </ColumnView>
    </Container>
  );
};
export default UserCard;
