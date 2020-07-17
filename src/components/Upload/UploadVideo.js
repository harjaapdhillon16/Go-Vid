import React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { Text } from "react-native-paper";
import { Dimensions, Platform } from "react-native";

import theme from "../../utils/theme";

const { width, height } = Dimensions.get("screen");
const Container = styled.View`
  flex: 1;
`;

const VideoStyled = styled(Video)`
  height: ${height / 1.5}px;
  width: ${width / 1.5}px;
  align-self: center;
  border-radius: 10px;
  background-color: ${theme.black};
`;

const VideoView = styled.View`
  border-radius: 10px;
  margin-top: 20px;
  height: ${height / 1.5 + 3}px;
  width: ${width / 1.5 + 3}px;
  align-self: center;
  border: 1px solid ${theme.primaryColor};
`;

const VideoView2 = styled.View`
  border-radius: 10px;
  margin-top: 20px;
  height: ${height / 1.5}px;
  width: ${width / 1.5}px;
  align-self: center;
  transform: scaleX(-1);
`;

class UploadVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <Container>
        <VideoView>
          <VideoStyled
            ref={(ref) => (this.vid = ref)}
            shouldPlay
            isLooping
            resizeMode={Platform.OS === "android" ? "contain" : ""}
            source={{ uri: this.props.videoRoutes[0] }}
          />
        </VideoView>
      </Container>
    );
  }
}
export default UploadVideo;
