import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import theme from "../../utils/theme";
import { TextInput, Keyboard } from "react-native";

const Container = styled.View``;

const Heading = styled(Text)`
  color: ${theme.white};
  font-size: 30px;
  font-weight: bold;
  padding: 10px;
  align-self:center;
`;
const Captions = styled(Text)`
  color: ${theme.white};
  padding-left: 10px;
  font-size: 20px;
`;

const Input = styled(TextInput)`
  width: 95%;
  align-self: center;
  height: 50px;
  border: 1px solid ${theme.lightWhite};
  border-radius: 10px;
  color: ${theme.white};
  margin-top: 10px;
  padding-left: 10px;
`;

const UploadCaptions = ({ _setKeyboardOn }) => {
  return (
    <Container>
      <Heading>Upload</Heading>
      <Captions>Captions</Captions>
      <Input
        onFocus={() => {
          _setKeyboardOn(true);
        }}
        placeholderTextColor={theme.lightWhite}
        placeholder="Captions for the Video"
        multiline={true}
        numberOfLines={3}
      />
    </Container>
  );
};
export default UploadCaptions;
