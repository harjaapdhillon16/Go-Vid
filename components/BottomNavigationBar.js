import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import MaterialDesign from "react-native-vector-icons/MaterialIcons";
import theme from "../utils/theme";
import { TouchableWithoutFeedback } from "react-native";

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  padding-bottom: 5px;
`;
const IconView = styled.View`
  width: 20%;
  align-items: center;
`;

const BottomNavigationBar = () => {
    const navigation = useNavigation()
  return (
    <Container>
      <TouchableWithoutFeedback  onPress={()=>navigation.navigate("home")}>
        <IconView>
          <MaterialDesign name="home" color="#fff" size={30} />
        </IconView>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>navigation.navigate("search")}>
        <IconView>
          <MaterialDesign name="search" color="#fff" size={30} />
        </IconView>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>navigation.navigate("upload")}>
        <IconView>
          <MaterialDesign name="backup" color={theme.primaryColor} size={30} />
        </IconView>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>navigation.navigate("notifications")}>
        <IconView>
          <MaterialDesign name="notifications-none" color="#fff" size={30} />
        </IconView>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>navigation.navigate("profile")}>
        <IconView>
          <MaterialDesign name="person" color="#fff" size={30} />
        </IconView>
      </TouchableWithoutFeedback>
    </Container>
  );
};
export default BottomNavigationBar;
