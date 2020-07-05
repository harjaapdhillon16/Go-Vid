import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";
import theme from "../../utils/theme";
import { Camera } from "expo-camera";
import IonicIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components";

const StyleCircle = {
  borderRadius: 100,
  backgroundColor: theme.primaryColor,
  position: "absolute",
  bottom: 40,
  alignSelf: "center",
  width: 80,
  height: 80,
};

const FlipIcon = styled(IonicIcons)`
  margin-bottom: 10px;
`;

export default class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back,
      camera: null,
    };
    this.changeView = this.changeView.bind(this);
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  changeView() {
    this.setState({ change: true });
    if (this.state.type === Camera.Constants.Type.back) {
      this.setState({ type: Camera.Constants.Type.front });
    } else {
      this.setState({ type: Camera.Constants.Type.back });
    }
  }
  shouldComponentUpdate() {
    return true;
  }
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  async handlePressIn() {
    const { camera } = this.state;
    Animated.spring(this.animatedValue, {
      toValue: 1.5,
      useNativeDriver: false,
    }).start();
    // const video = await camera.recordAsync();
    // console.log(video.uri);
  }
  handlePressOut() {
    const { camera } = this.state;
    Animated.spring(this.animatedValue, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
    // camera.stopRecording();
  }
  ApplyRef(ref) {
    if (this.state.camera === null) {
      this.setState({ camera: ref });
    }
  }
  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }],
    };
    return (
      <Camera style={{ flex: 1 }} type={this.state.type} ref={(ref) => this.ApplyRef(ref)}>
        <View style={{ position: "absolute", top: 10, right: 10 }}>
          <FlipIcon
            onPress={() => this.changeView()}
            name="camera-retake"
            size={40}
            color={theme.white}
          />
          <FlipIcon name="flash" size={40} color={theme.white} />
        </View>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
        >
          <Animated.View style={[StyleCircle, animatedStyle]}></Animated.View>
        </TouchableWithoutFeedback>
      </Camera>
    );
  }
}
