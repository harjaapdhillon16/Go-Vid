import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native-paper";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import theme from "../../utils/theme";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.black};
  padding-top: ${Constants.statusBarHeight}px;
  justify-content: center;
`;

const Heading = styled(Text)`
  color: ${theme.white};
  font-weight: bold;
  align-self: center;
  text-align: center;
  font-size: 17px;
  width: 80%;
  margin-top: 10px;
`;
const Image = styled.Image`
  border-radius: 100px;
  height: 100px;
  width: 100px;
  align-self: center;
`;

const UploadButton = styled(Button)`
  border-radius: 10px;
  background-color: ${theme.blue};
  width: 50%;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 20%;
`;
const Skip = styled(Button)`
  position: absolute;
  bottom: 30px;
  right: 20px;
  border-radius: 10px;
  border: 1px solid ${theme.blue};
`;

const ProfilePicture = () => {
  const Navigation = useNavigation();

  const [imageUri, _setImageUri] = React.useState(
    "https://progresssoft.imgix.net/default-user.jpg?auto=compress&fit=crop"
  );
  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        allowsEditing: true,
        quality: 0.9,
      });
      if (!result.cancelled) {
        _setImageUri(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };
  return (
    <Container>
      <Image
        source={{
          uri: imageUri,
        }}
      />
      <Heading>Please upload a profile picture to wrap it all up</Heading>
      <UploadButton onPress={()=>_pickImage()} labelStyle={{ color: theme.white, fontWeight: "bold" }}>
        Upload
      </UploadButton>
      <Skip
        uppercase={false}
        labelStyle={{ color: theme.white, fontWeight: "bold" }}
      >
        skip
      </Skip>
    </Container>
  );
};
export default ProfilePicture;
