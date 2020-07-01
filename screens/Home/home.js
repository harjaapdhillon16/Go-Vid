import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";

import  theme  from "../../utils/theme";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
`;

const Home = () => {
  return (
    <Container>
      <Title>Hello</Title>
    </Container>
  );
};
export default Home;
