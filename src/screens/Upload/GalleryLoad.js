import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import { setStatusBarHidden } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import theme from "../../utils/theme";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.black};
`;

const Heading = styled(Text)`
  color: ${theme.white};
  font-weight: bold;
  align-self: center;
  font-size: 18px;
  width: 70%;
  text-align: center;
  padding-top: 20px;
`;

const UploadButton = styled(Button)`
  width: 100%;
  position: absolute;
  height: 30%;
  bottom: 0;
  justify-content: center;
  background-color: ${theme.red};
  border-radius: 0px;
`;
const CameraVideo = styled.View`
  width: 100%;
  position: absolute;
  height: 30%;
  bottom: 30%;
  justify-content: center;
  border-radius: 0px;
  background-color: ${theme.purpleColor};
`;
const ButtonText = styled(Text)`
  color: ${theme.white};
  font-size: 15px;
  align-self: center;
  text-align: center;
  font-weight: 500;
`;

const Icon = styled(MaterialIcons)`
  transform: rotateZ(45deg);
`;
const IconBack = styled.View`
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 2;
  elevation: 2;
`;

const GalleryLoad = ({}) => {
  const navigation = useNavigation();

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  React.useEffect(() => {
    getPermissionAsync();
  }, []);
  React.useState(() => {
    navigation.addListener("focus", () => setStatusBarHidden(true, "slide"));
  });
  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.cancelled) {
        console.log(result.uri);
        navigation.navigate("upload", {
          videoFiles: [result.uri],
          cameraType: [true],
        });
      }
    } catch (E) {
      console.log(E);
    }
  };
  return (
    <Container>
      <Heading>Create and Post Videos</Heading>
      <IconBack
        onTouchEndCapture={() => {
          navigation.goBack();
        }}
      >
        <Icon size={40} color={theme.white} name="add-circle" />
      </IconBack>
      <CameraVideo
        labelStyle={{ fontWeight: "bold", fontSize: 10 }}
        mode="contained"
      >
        <ButtonText>The Video Camera functionality is coming soon</ButtonText>
      </CameraVideo>
      <TouchableWithoutFeedback
        style={{ backgroundColor: "transparent" }}
        onPress={() => _pickImage()}
      >
        <UploadButton
          labelStyle={{ fontWeight: "bold", fontSize: 30 }}
          mode="contained"
        >
          Upload Video
        </UploadButton>
      </TouchableWithoutFeedback>
    </Container>
  );
};
export default GalleryLoad;
