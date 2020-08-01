import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import theme from "../../utils/theme";

const ENTRIES1 = [
  {
    title: "LATEST ",
    subtitle: "Lorem ipsum",
    illustration: "https://images.unsplash.com/photo-1573350289846-890d1c55df8f",
    screen:"latest"
  },
  {
    title: "Popular Post(Coming soon)",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://images.unsplash.com/photo-1582395787198-630d7fb2bfbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  },
];
const { width: screenWidth } = Dimensions.get("window");

const Heading = styled(Text)`
  color: ${theme.white};
  padding: 10px;
  font-weight: bold;
  align-self: center;
`;
const ImageTextView = styled.View`
  margin-top: -30px;
  width: 100%;
`;
const ImageText = styled(Text)`
  color: white;
  padding-left: 20px;
  font-weight: bold;
`;

const Explore = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);
  const Navigation = useNavigation();
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (item.screen === "latest") {
            Navigation.navigate("latest");
          }
        }}
      >
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.illustration }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            {...parallaxProps}
          />
          <ImageTextView>
            <ImageText style={{}} numberOfLines={2}>
              {item.title}
            </ImageText>
          </ImageTextView>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Heading>EXPLORE</Heading>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
