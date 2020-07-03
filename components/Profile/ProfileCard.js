import React from "react";
import styled from "styled-components/native";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";

import theme from "../../utils/theme";

const { width } = Dimensions.get("screen");

const Container = styled.View`
  width: 95%;
  background-color: ${theme.primaryColor};
  min-height: 50px;
  margin-top: 10px;
  align-self: center;
  border-radius: 10px;
`;
const RowView = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
`;
const Image = styled.Image`
  width: ${(width * 40) / 100}px;
  height: ${(width * 40) / 100}px;
  border-radius: 20px;
  margin: 5px;
`;

const Name = styled(Text)`
  font-weight: bold;
  font-size: 18px;
`;
const Username = styled(Text)`
  font-weight: bold;
  font-size: 10px;
`;
const DetailsView = styled.View`
  background-color: ${theme.lightBlack};
  width: 30%;
  align-items: center;
  align-self: center;
  margin-top: 10px;
  padding: 10px 0px;
  margin-right:2px;
  margin-left:2px;
  border-radius:5px;
`;
const DetailsText = styled(Text)`
  color: ${theme.white};
  font-size: 15px;
  font-weight: bold;
`;
const DetailsText2 = styled(Text)`
  color: ${theme.white};
  font-size: 18px;
  font-weight: bold;
`;

const RowView2 = styled(RowView)`
    align-self:center;
`


const ProfileCard = () => {
  return (
    <>
      <Container>
        <RowView>
          <Image
            source={{
              uri:
                "https://66.media.tumblr.com/ad73b240df8cc0eb0f0b13bba0446481/tumblr_oqn0g0qWeI1tc6asro8_400.png",
            }}
          />
          <View>
            <Name>Clay Jensen</Name>
            <Username>@clay_jensen</Username>
          </View>
        </RowView>
      </Container>
      <RowView2>
        <DetailsView>
          <DetailsText>Followers</DetailsText>
          <DetailsText2>20m</DetailsText2>
        </DetailsView>
        <DetailsView>
          <DetailsText>Following</DetailsText>
          <DetailsText2>20</DetailsText2>
        </DetailsView>
        <DetailsView>
          <DetailsText>Likes</DetailsText>
          <DetailsText2>100</DetailsText2>
        </DetailsView>
      </RowView2>
    </>
  );
};
export default ProfileCard;
