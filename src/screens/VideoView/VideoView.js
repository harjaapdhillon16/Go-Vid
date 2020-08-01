import React from "react";
import styled from "styled-components/native";
import { Text, TextInput } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";

import theme from "../../utils/theme";
import SwipingView from "../../components/Home/SwipingView";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.black};
`;
const Icon = styled(MaterialIcons)`
  transform: rotateZ(45deg);
  position: absolute;
  top: 40px;
  left: 10px;
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
        <>
          <SwipingView no={index} navigation={navigation} Data={data} />
          <Icon
            size={40}
            onPress={() => navigation.goBack()}
            color={theme.white}
            name='add-circle'
          />
        </>
      )}
    </Container>
  );
};
export default VideoView;
