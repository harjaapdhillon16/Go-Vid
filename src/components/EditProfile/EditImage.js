import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";

import theme from "../../utils/theme";

const { width } = Dimensions.get("screen");

const Image = styled.Image`
  width: ${(width * 50) / 100}px;
  height: ${(width * 50) / 100}px;
  margin: 10px;
  border-radius: 20px;
  align-self: center;
`;
const RowView = styled.View``;
const EditImageButton = styled(Button)`
  width: 90%;
  align-self: center;
  margin-left: 5px;
  background-color: ${theme.red};
`;
const EditImage = ({ uri }) => {
  return (
    <RowView>
      <Image
        source={{
          uri: uri,
        }}
      />
      <EditImageButton labelStyle={{ fontWeight: "bold" }} mode="contained">
        Change Profile Picture
      </EditImageButton>
    </RowView>
  );
};
export default EditImage;
