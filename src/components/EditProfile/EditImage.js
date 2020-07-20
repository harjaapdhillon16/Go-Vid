import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

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
const EditImage = ({ uri, setUri, _setImageChanged, setChange }) => {
  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.cancelled) {
        await setUri(result.uri);
        await _setImageChanged(true);
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <RowView>
      <Image
        source={{
          uri: uri,
        }}
      />
      <EditImageButton
        onPress={() => _pickImage()}
        labelStyle={{ fontWeight: "bold" }}
        mode="contained"
      >
        Change Profile Picture
      </EditImageButton>
    </RowView>
  );
};
export default EditImage;
