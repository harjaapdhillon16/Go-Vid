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
  padding-bottom:3px;
`;
const Username = styled(Text)`
  font-weight: bold;
  color: ${theme.white};
  padding-top:3px;
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

const NotificationComponent = () => {
  return (
    <Container>
      <Image
        source={{
          uri:
            "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/s150x150/105963185_581204589498570_1605544719838487731_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com&_nc_ohc=_vp8Ba3hbpsAX-sp2SZ&oh=e3da91d5b7ac5eaf1967b9711415fea3&oe=5F37975F",
        }}
      />
      <TextView>
        <Username>@harjaap_dhillon_</Username>
        <Heading> Just Liked Your Video</Heading>
      </TextView>
      <Image
        style={{ borderRadius: 10 }}
        source={{
          uri:
            "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/s150x150/105963185_581204589498570_1605544719838487731_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com&_nc_ohc=_vp8Ba3hbpsAX-sp2SZ&oh=e3da91d5b7ac5eaf1967b9711415fea3&oe=5F37975F",
        }}
      />
    </Container>
  );
};
export default NotificationComponent;
