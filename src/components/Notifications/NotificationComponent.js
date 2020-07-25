import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

import theme from "../../utils/theme";

const Container = styled.View`
  width: 95%;
  height: auto;
  background-color: ${theme.lightBlack};
  align-self: center;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const Heading = styled(Text)`
  color: ${theme.white};
  padding: 1px;
  font-weight: 500;
  padding-bottom: 3px;
`;
const Username = styled(Text)`
  font-weight: bold;
  color: ${theme.white};
  padding-top: 3px;
`;
const TextView = styled.View`
  width: 62%;
`;

const Image = styled.Image`
  width: ${(width * 15) / 100}px;
  margin: 5px;
  height: ${(width * 15) / 100}px;
  border-radius: 100px;
`;

const NotificationComponent = ({ data }) => {
  return (
    <Container>
      <Image
        source={{
          uri: data.image,
        }}
      />
      <TextView>
        <Username>@{data.username}</Username>
        {data.notificationType === "like" ? (
          <Heading> Just Liked Your Video</Heading>
        ) : (
          <Heading>Started following you</Heading>
        )}
      </TextView>
      {data.notificationType === "like" ? (
        <Image
          style={{ borderRadius: 10 }}
          source={{
            uri: data.uri,
          }}
        />
      ) : null}
    </Container>
  );
};
export default NotificationComponent;
