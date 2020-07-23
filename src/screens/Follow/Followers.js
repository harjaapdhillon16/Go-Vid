import React from "react";
import styled from "styled-components/native";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import Constants from "expo-constants";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import axiosInstance from "../../api/instance";
import * as SecureStore from "expo-secure-store";

import UserCard from "../../components/UserCard/UserCard";
import theme from "../../utils/theme";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;
const Heading = styled(Text)`
  color: ${theme.white};
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Icons = styled(AntDesign)`
  transform: rotateZ(45deg);
  position: absolute;
  bottom: 30px;
  left: 20px;
`;

const ScrollView = styled.ScrollView``;

const Loading = () => (
  <ActivityIndicator
    color={theme.primaryColor}
    size={30}
    style={{ alignSelf: "center", paddingLeft: "45%", paddingTop: 20 }}
  />
);

const Followers = ({ route }) => {
  const Navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      fetchInfo();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        _setData([]);
      };
    }, [])
  );

  const fetchInfo = async () => {
    _setLoading(true);

    const uid = await SecureStore.getItemAsync("routeID");
    console.log(uid);
    axiosInstance
      .post("/followers", {
        uid,
      })
      .then((result) => {
        _setData([...result.data]);
        _setLoading(false);
      });
  };
  const [data, _setData] = React.useState([]);
  const [loading, _setLoading] = React.useState(true);

  return (
    <Container>
      <ScrollView>
        <Heading>Followers</Heading>
        {loading ? <Loading /> : null}

        {data.map((data, index) => (
          <UserCard key={index} Data={data} />
        ))}
      </ScrollView>
      <Icons
        onPress={() => Navigation.goBack()}
        name="pluscircle"
        size={45}
        color={theme.white}
      />
    </Container>
  );
};
export default Followers;
