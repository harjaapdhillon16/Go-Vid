import React from "react";
import styled from "styled-components";
import Swiper from "react-native-swiper";

import Post from "./Post";

const SwipingView = () => {
  return (
    <Swiper horizontal={false} showsPagination={false}>
      <Post />
      <Post />
      <Post />
    </Swiper>
  );
};
export default SwipingView;
