import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";

import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
  padding-top:20px;
`;

const Heading = styled(Title)`
  color: ${theme.white};
  padding:5px;
  font-weight:bold;
`;

const Notifications = () => {
  return (
    <Container>
      <Heading>Notifications</Heading>
      <BottomNavigationBar />
    </Container>
  );
};
export default Notifications;
