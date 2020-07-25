import React from "react";
import styled from "styled-components";
import ViewPager from "@react-native-community/viewpager";
import { useNavigation } from "@react-navigation/native";
import HomeAction from "../../redux/HomeFeed/HomeAction";
import { useDispatch, useSelector } from "react-redux";
import Lodash from "lodash.debounce";
import { Dimensions, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import theme from "../../utils/theme";

const { height } = Dimensions.get("screen");

import Post from "./Post";

const Container = styled(ViewPager)`
  height: ${height}px;
`;
const LoadingTopView = styled(ActivityIndicator)`
  padding-top: 40%;
`;

const SwipingView = ({ Data,navigation, no }) => {
  const [initialLoad, _setInitialLoad] = React.useState(false);
  const [currentSlide, _setCurrentSlide] = React.useState(null);
  const indexState = useSelector((state) => state.home.no);
  const Dispatch = useDispatch();
  // React.useEffect(() => {
  //   navigation.addListener("focus", () => {
  //     if (no !== undefined) {
  //       Dispatch(HomeAction(index));
  //     }
  //   });
  // });

  function ChangeIndex(index) {
    Dispatch(HomeAction(index));
    // _setCurrentSlide(index);
  }
  if (Data.length === 0) {
    return <LoadingTopView size={40} color={theme.primaryColor} />;
  }
  return (
    <Container
      orientation="vertical"
      initialPage={no === undefined ? 0 : no}
      onPageSelected={(e) => {
        ChangeIndex(e.nativeEvent.position);
      }}
    >
      {Data.map((item, index) => {
        return (
          <View key={index}>
            <Post data={item} no={no} index={index} indexState={indexState} />
          </View>
        );
      })}
    </Container>
  );
};
export default SwipingView;
