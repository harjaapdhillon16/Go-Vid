import React from "react";
import styled from "styled-components/native";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";

import firebase from "../../../config";

import theme from "../../utils/theme";

const { width } = Dimensions.get("screen");

const Container = styled.View`
  width: 95%;
  background-color: ${theme.lightWhite};
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
  margin-right: 2px;
  margin-left: 2px;
  border-radius: 5px;
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
  align-self: center;
`;
const DetailsView2 = styled(DetailsView)`
  width: 92%;
  align-self: center;
  margin: 0px;
  align-items: center;
  margin-top: 10px;
`;

const BioText = styled(DetailsText2)`
  font-weight: normal;
  font-size: 15px;
  text-align: center;
`;

const ProfileCard = ({ data }) => {
   
  return (
    <>
      <Container>
        <RowView>
          <Image
            source={{
              uri: data.uri
                ? data.uri
                : "https://progresssoft.imgix.net/default-user.jpg?auto=compress&fit=crop",
            }}
          />
          <View>
            <Name>{data.name ? data.name : ""}</Name>
            <Username>@{data.username ? data.username : ""}</Username>
          </View>
        </RowView>
      </Container>
      <RowView2>
        <DetailsView>
          <DetailsText>Followers</DetailsText>
          <DetailsText2>
            {data.followers !== undefined || "" ? data.followers : ""}
          </DetailsText2>
        </DetailsView>
        <DetailsView>
          <DetailsText>Following</DetailsText>
          <DetailsText2>
            {data.following !== undefined || "" ? data.following : ""}
          </DetailsText2>
        </DetailsView>
        <DetailsView>
          <DetailsText>Likes</DetailsText>
          <DetailsText2>
            {data.likes !== undefined || "" ? data.likes : ""}
          </DetailsText2>
        </DetailsView>
      </RowView2>
      {data.bio === "" ? null : (
        <DetailsView2>
          <BioText>{data.bio}</BioText>
        </DetailsView2>
      )}
    </>
  );
};
export default ProfileCard;
