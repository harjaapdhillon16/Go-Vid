import React from "react";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();
  const [VideoPlaying, _setVideoPlaying] = React.useState(0);
  const ChangeIndex = (index) => {
  };
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
          playing={VideoPlaying}
          link={item.link}
          username={item.username}
        />
      ))}
    </Swiper>
  );
};
export default SwipingView;
