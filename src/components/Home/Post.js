import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import VideoWithLikes from "./VideoWithLikes";

const { height } = Dimensions.get("screen");

const Height = height / 2;

export default function Example(props) {
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Copy</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Paste</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Crop</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Search</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Send</Text>
      </View>
    </View>
  );

  const renderHeader = () => <View style={styles.header} />;

  const fall = new Animated.Value(0);
  const bs = React.createRef();
 
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={bs}
          snapPoints={[Height + 200, Height, 0]}
          renderContent={renderInner}
          initialSnap={2}
          renderHeader={renderHeader}
          callbackNode={fall}
          enabledInnerScrolling={true}
        />

        <VideoWithLikes
          index={props.index}
          caption={props.caption}
          username={props.username}
          link={props.link}
          navigation={props.navigation}
          snapToTop={() => bs.current.snapTo(1)}
        />
      </View>
    );
  
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 600,
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
  photo: {
    width: "100%",
    height: 225,
    marginTop: 30,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
