import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import { Dimensions } from "react-native";

import theme from "../../utils/theme";
import EditImage from "../../components/EditProfile/EditImage";
import EditDetails from "../../components/EditProfile/EditDetails";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
  background-color: ${theme.black};
  padding-top: 20px;
`;
const Heading = styled(Text)`
  color: ${theme.white};
  padding: 5px;
  font-weight: 600;
  font-size: 25px;
`;
const ScrollView = styled.ScrollView``


const EditProfile = () => {
  return (
    <Container>
    <ScrollView>
      <Heading>Edit Profile</Heading>
      <EditImage />
      <EditDetails/>
    </ScrollView>
    </Container>
  );
};
export default EditProfile;
