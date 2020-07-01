import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";

import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
`;

const Heading = styled(Title)`
  color: ${theme.white};
`;

const Search = () => {
  return (
    <Container>
      <Heading>Hello Search</Heading>
      <BottomNavigationBar/>
    </Container>
  );
};
export default Search;
