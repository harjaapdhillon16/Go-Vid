import React from "react";
import styled from "styled-components/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Keyboard } from "react-native";
import { Button } from "react-native-paper";

import theme from "../../utils/theme";
import UploadVideo from "../../components/Upload/UploadVideo";
import UploadCaptions from "../../components/Upload/UploadCaptions";

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

const PostButton = styled(Button)`
  position: absolute;
  right: 5px;
  top: 10px;
  border: 1px solid ${theme.purpleColor};
`;

const ScrollView = styled.ScrollView``;

const Upload = ({ route, navigation }) => {
  const [videoRoutes, _setVideoRoutes] = React.useState([]);
  const [keyboardOn, _setKeyboardOn] = React.useState(false);

  const [cameraTypeState, _setCameraTypeState] = React.useState([]);
  React.useEffect(() => {
    if (typeof route.params === "object") {
      _setVideoRoutes([...route.params.videoFiles]);
      _setCameraTypeState([...route.params.cameraType]);
    }
  }, [route.params]);

  return (
    <Container
      onTouchEnd={() => {
        if (keyboardOn) {
          Keyboard.dismiss();
          _setKeyboardOn(false);
        }
      }}
    >
      <ScrollView>
        <IconBack
          onTouchEndCapture={() => {
            navigation.goBack();
            navigation.goBack();
          }}
        >
          <Icon size={30} color={theme.white} name="add-circle" />
        </IconBack>
        <PostButton mode="contained">Post</PostButton>

        <UploadCaptions _setKeyboardOn={(item) => _setKeyboardOn(item)} />
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
