import React from "react";
import styled from "styled-components/native";
import { Text, TextInput } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";

import theme from "../../utils/theme";
import SwipingView from "../../components/Home/SwipingView";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.black};
`;

const VideoView = ({ navigation }) => {
  const VideoState = useSelector((state) => state.videoView.data);
  const Index = useSelector((state) => state.videoView.index);
  const [data, _setData] = React.useState([]);

  const [index, _setIndex] = React.useState(null);
  React.useEffect(() => {
    _setIndex(Index);
    _setData(VideoState);

  }, [VideoState]);

  return (
    <Container>
      {data.length === 0 ? (
        <Container />
      ) : (
        <SwipingView no={index} navigation={navigation} Data={data} />
      )}
    </Container>
  );
};
export default VideoView;
