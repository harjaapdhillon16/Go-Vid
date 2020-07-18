import React from "react";
import styled from "styled-components/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Keyboard, Text, Platform } from "react-native";
import { Button } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

import theme from "../../utils/theme";
import UploadVideo from "../../components/Upload/UploadVideo";
import UploadCaptions from "../../components/Upload/UploadCaptions";
import AxiosInstance from "../../api/instance";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.black};
`;

const Icon = styled(MaterialIcons)`
  transform: rotateZ(45deg);
`;
const IconBack = styled.View`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 2;
  elevation: 2;
`;

const ScrollView = styled.ScrollView``;

const Upload = ({ route, navigation }) => {
  const [videoRoutes, _setVideoRoutes] = React.useState([]);
  const [keyboardOn, _setKeyboardOn] = React.useState(false);
  const [caption, _setCaption] = React.useState("");
  const [post, _setPost] = React.useState("Post");

  const [cameraTypeState, _setCameraTypeState] = React.useState([]);
  React.useEffect(() => {
    if (typeof route.params === "object") {
      _setVideoRoutes([...route.params.videoFiles]);
      _setCameraTypeState([...route.params.cameraType]);
    }
  }, [route.params]);

  const submit = async () => {
    Keyboard.dismiss();
    const formData = new FormData();
    const uid = await SecureStore.getItemAsync("user");
    formData.append("file", {
      name: uid,
      type: "multipart/form-data", // <-- this part here
      uri:
        Platform.OS === "android"
          ? videoRoutes[0]
          : videoRoutes[0].replace("file:/", ""),
    });
    console.log(videoRoutes[0]);
    formData.append(caption, caption);
    const config = {
      onUploadProgress: (progressEvent) => true,
    };

    AxiosInstance.post("/videoUpload", formData, config).then(() => {
      navigation.navigate('homeApp')
    });
  };

  return (
    <Container
      onTouchEnd={() => {
        if (keyboardOn) {
          Keyboard.dismiss();
          _setKeyboardOn(false);
        }
      }}
    >
      <ScrollView keyboardShouldPersistTaps="always">
        <IconBack
          onTouchEndCapture={() => {
            navigation.goBack();
            navigation.goBack();
          }}
        >
          <Icon size={30} color={theme.white} name="add-circle" />
        </IconBack>

        <UploadCaptions
          upload={() => submit()}
          Caption={caption}
          setCaption={(e) => _setCaption(e)}
          _setKeyboardOn={(item) => _setKeyboardOn(item)}
        />
        <UploadVideo
          videoRoutes={videoRoutes}
          navigation={navigation}
          cameraType={cameraTypeState}
        />
      </ScrollView>
    </Container>
  );
};
export default Upload;
