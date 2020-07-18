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
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      if (initialLoad === false) {
        _setInitialLoad(true);
        ChangeIndex(0);
      }
    });
  });
  function ChangeIndex(index) {
    console.log(index)
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
            <Post
              key={index}
              indexState={indexState}
              index={index}
              url={item.url}
              uri={item.uri}
              likes={item.likes}
              comments={item.comments}
              username={item.username}
              caption={item.caption}
            />
          </View>
        );
      })}
    </Container>
  );
};
export default SwipingView;
