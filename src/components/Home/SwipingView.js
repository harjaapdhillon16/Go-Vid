import React from "react";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import HomeAction from "../../redux/HomeFeed/HomeAction";
import { useDispatch } from "react-redux";

import Post from "./Post";

const Data = [
  {
    link: "../../assets/video.mp4",
    username: "city_life",
  },
  {
    link: "../../assets/video1.mp4",
    username: "cit_life",
  },
  {
    link: "../../assets/video2.mp4",
    username: "harjaap_dhillon_",
  },
];

const SwipingView = () => {
  const Dispatch = useDispatch()
  const ChangeIndex = (index) => {
    Dispatch(HomeAction(index))
  };
  React.useEffect(()=>{
    Dispatch(HomeAction(0))
  },[])
  return (
    <Swiper
      horizontal={false}
      showsPagination={false}
      onIndexChanged={(index) => ChangeIndex(index)}
    >
      {Data.map((item, index) => (
        <Post
          key={index}
          index={index}
          link={item.link}
          username={item.username}
        />
      ))}
    </Swiper>
  );
};
export default SwipingView;
