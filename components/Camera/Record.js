import React, { Component } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  PanResponder,
  Dimensions,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import IonicIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import theme from "../../utils/theme";

const Icon = styled(MaterialIcons)`
  transform: rotateZ(45deg);
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
  elevation: 2;
`;
const Icon2 = styled(MaterialIcons)`
  position: absolute;
  right: 10px;
  bottom: 55px;
  z-index: 10;
  elevation: 10;
`;

const StyleCircle = {
  borderRadius: 100,
  backgroundColor: theme.primaryColor,
  position: "absolute",
  bottom: 40,
  alignSelf: "center",
  width: 80,
  height: 80,
};

const { height, width } = Dimensions.get("screen");

const FlipIcon = styled(IonicIcons)`
  margin-bottom: 10px;
`;

const AnimatedStyle = {
  height: 10,
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: theme.red,
};

export default class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back,
      camera: null,
      zoom: 0,
      recordingStarted: false,
      iconsShow: true,
      opacity: 1,
      recordingCompleted: false,
      width: new Animated.Value(0),
      flashMode: Camera.Constants.FlashMode.on,
    };
    this.changeView = this.changeView.bind(this);
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  changeView() {
    // this.setState({ zoom: 0 });
    // this.setState({ change: true });
    if (this.state.type === Camera.Constants.Type.back) {
      this.setState({ type: Camera.Constants.Type.front });
    } else {
      this.setState({ type: Camera.Constants.Type.back });
    }
  }
  componentDidMount() {}
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  async handlePressIn() {
    const { camera } = this.state;
    this.setState({ recordingCompleted: false });
    if (Platform.OS === "ios") {
      this.setState({ recordingStarted: true });
      this.setState({ iconsShow: false });
    } else {
      this.setState({ opacity: 0 });
    }
    Animated.spring(this.animatedValue, {
      toValue: 1.5,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.width, {
      toValue: width,
      duration: 60000,
      useNativeDriver: false,
    }).start();
    const video = await camera.recordAsync();
    this.state.type === Camera.Constants.Type.back
      ? this.props.VideoPathSet(video.uri,true)
      : this.props.VideoPathSet(video.uri, false);
  }
  handlePressOut() {
    const { camera } = this.state;
    Animated.spring(this.animatedValue, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.width).stop();
    if (this.state.recordingStarted) {
      this.setState({ recordingCompleted: true });
    }
    this.setState({ iconsShow: true });
    this.setState({ recordingStarted: false });
    this.setState({ opacity: 1 });
    camera.stopRecording();
  }
  ApplyRef(ref) {
    if (this.state.camera === null) {
      this.setState({ camera: ref });
    }
  }
  FlashToggle() {
    // if(Camera.)
  }
  panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: async (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}

      const realHeight = height + 1000;
      const PercentageChange = gestureState.dy / realHeight;
      if (PercentageChange > 0) {
      } else {
        await this.setState({ zoom: -PercentageChange });
      }
    },
    onPanResponderTerminationRequest: (evt, gestureState) => false,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }],
    };
    if (Platform.OS === "ios") {
      return (
        <View
          style={{ backgroundColor: "rgba(255, 255, 255, 0.01)", flex: 1 }}
          onTouchEndCapture={this.handlePressOut}
          {...this.panResponder.panHandlers}
        >
          <Camera
            style={{
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.01)",
            }}
            flash={Camera.Constants.FlashMode.torch}
            type={this.state.type}
            ref={(ref) => this.ApplyRef(ref)}
            zoom={this.state.zoom}
            ratio="16:9"
          >
            {this.state.recordingStarted ? (
              <View />
            ) : (
              <View>
                <Icon
                  onPress={() => this.props.goBack()}
                  name="add-circle"
                  color={theme.red}
                  size={40}
                  style={{ opacity: this.state.opacity }}
                />
              </View>
            )}
            {this.state.iconsShow ? (
              <>
                <View style={{ position: "absolute", top: 10, right: 10 }}>
                  {Platform.OS === "ios" ? (
                    <FlipIcon
                      onPress={() => this.changeView()}
                      name="camera-retake"
                      size={40}
                      color={theme.white}
                    />
                  ) : (
                    <MaterialIcons
                      onPress={() => this.changeView()}
                      name="switch-camera"
                      size={40}
                      style={{ marginBottom: 10 }}
                      color={theme.white}
                    />
                  )}

                  {/* <FlipIcon name="flash" size={40} color={theme.white} /> */}
                </View>
              </>
            ) : (
              <View />
            )}
            {this.state.recordingCompleted ? (
              <Icon2
                name="check-box"
                onPress={() => this.props.navigateUpload()}
                color={theme.red}
                size={40}
              />
            ) : (
              <View />
            )}
            <Animated.View
              style={{
                width: this.state.width,
                ...AnimatedStyle,
              }}
            />
            <TouchableWithoutFeedback onPressIn={this.handlePressIn}>
              <Animated.View
                style={[StyleCircle, animatedStyle]}
              ></Animated.View>
            </TouchableWithoutFeedback>
          </Camera>
        </View>
      );
    } else {
      return (
        <View
          style={{ backgroundColor: "rgba(255, 255, 255, 0.01)", flex: 1 }}
          onTouchEndCapture={this.handlePressOut}
        >
          <Camera
            style={{
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.01)",
            }}
            flash={this.state.flashMode}
            type={this.state.type}
            ref={(ref) => this.ApplyRef(ref)}
            zoom={this.state.zoom}
            ratio="16:9"
          >
            {this.state.recordingStarted ? (
              <View />
            ) : (
              <View>
                <Icon
                  onPress={() => this.props.goBack()}
                  name="add-circle"
                  color={theme.red}
                  size={40}
                  style={{ opacity: this.state.opacity }}
                />
              </View>
            )}
            {this.state.iconsShow ? (
              <>
                <View style={{ position: "absolute", top: 10, right: 10 }}>
                  {Platform.OS === "ios" ? (
                    <FlipIcon
                      onPress={() => this.changeView()}
                      name="camera-retake"
                      size={40}
                      color={theme.white}
                    />
                  ) : (
                    <MaterialIcons
                      onPress={() => this.changeView()}
                      name="switch-camera"
                      size={40}
                      style={{ marginBottom: 10 }}
                      color={theme.white}
                    />
                  )}

                  {/* <FlipIcon name="flash" size={40} color={theme.white} /> */}
                </View>
              </>
            ) : (
              <View />
            )}

            <Icon2
              name="check-box"
              style={{ opacity: this.state.opacity }}
              color={theme.red}
              size={40}
              onPress={() => this.props.navigateUpload()}
            />

            <TouchableWithoutFeedback onPressIn={this.handlePressIn}>
              <Animated.View
                style={[StyleCircle, animatedStyle]}
              ></Animated.View>
            </TouchableWithoutFeedback>
          </Camera>
        </View>
      );
    }
  }
}
