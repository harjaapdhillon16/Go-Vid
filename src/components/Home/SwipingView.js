import React from "react";
import styled from "styled-components";
import ViewPager from "@react-native-community/viewpager";
import { useNavigation } from "@react-navigation/native";
import HomeAction from "../../redux/HomeFeed/HomeAction";
import { useDispatch, useSelector } from "react-redux";
import Lodash from "lodash.debounce";
import { Dimensions, View } from "react-native";

const { height } = Dimensions.get("screen");

import Post from "./Post";

const Container = styled(ViewPager)`
  height: ${height}px;
`;

const SwipingView = ({ Data, navigation }) => {
  const [initialLoad, _setInitialLoad] = React.useState(false);
  const [currentSlide, _setCurrentSlide] = React.useState(null);
  const indexState = useSelector((state) => state.home.no);
  const Dispatch = useDispatch();

  function ChangeIndex(index) {
    Dispatch(HomeAction(index));
    // _setCurrentSlide(index);
  }
  if (Data.length === 0) {
    return <View />;
  }
  return (
    <Container
      orientation="vertical"
      initialPage={0}
      onPageSelected={(e) => {
        ChangeIndex(e.nativeEvent.position);
      }}
    >
      {Data.map((item, index) => {
        return (
          <View key={index}>
            <Post data={item} index={index} indexState={indexState} />
          </View>
        );
      })}
    </Container>
  );
};
export default SwipingView;
