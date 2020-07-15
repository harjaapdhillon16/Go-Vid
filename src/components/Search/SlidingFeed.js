import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { View, Dimensions, StyleSheet, Platform } from "react-native";
import styled from "styled-components/native";
import { Text } from "react-native-paper";

import theme from "../../utils/theme";

const ENTRIES1 = [
  {
    title: "Beautiful ",
    subtitle: "Lorem ipsum",
    illustration: "https://i.imgur.com/MABUbpDl.jpg",
  },
  {
    title: "Earlier this morning, NYC",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/UPrs1EWl.jpg",
  },
  {
    title: "White Pocket Sunset",
    subtitle: "Lorem ipsum dolor sit amet et nuncat ",
    illustration: "https://i.imgur.com/MABUbpDl.jpg",
  },
  {
    title: "Acrocorinth, Greece",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/KZsmUi2l.jpg",
  },
  {
    title: "New Zealand",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/UPrs1EWl.jpg",
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

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
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