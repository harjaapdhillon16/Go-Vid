import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import VideoWithLikes from "./VideoWithLikes";
import Comments from "../SharedComponents/Comments";

const { height } = Dimensions.get("screen");

const Height = height;

export default function Example(props) {
  const renderInner = () => (
    <View>
      <View style={styles.panel}>
        <Comments />
      </View>
    </View>
  );

  const renderHeader = () => <View style={styles.panelContainer}></View>;
  const navigation = useNavigation();
  const fall = new Animated.Value(0);
  const bs = React.createRef();

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[Height, 0]}
        renderContent={renderInner}
        initialSnap={1}
        renderHeader={renderHeader}
        callbackNode={fall}
        enabledInnerScrolling={true}
      />

      <VideoWithLikes
        data={props.data}
        snapToTop={() => bs.current.snapTo(0)}
        index={props.index}
        navigation={navigation}
        indexState={props.indexState}
      />
    </View>
  );
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: "#000",
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: height - 10,
    padding: 20,
    backgroundColor: "#000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 5,
  },
  header: {
    width: "100%",
    height: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#292929",
    alignItems: "center",
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
