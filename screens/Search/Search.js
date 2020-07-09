import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { StatusBar, setStatusBarHidden } from "expo-status-bar";

import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
  padding-top: 25px;
`;

const Heading = styled(Title)`
  color: ${theme.white};
`;

const SearchInput = styled(Searchbar)`
  width: 90%;
  align-self: center;
  background-color: ${theme.lightBlack};
  color: ${theme.white};
`;
const Search = ({ navigation }) => {
  React.useEffect(() => {
    navigation.addListener("focus", () => setStatusBarHidden(false, "none"));
  });
  let reference;
  return (
    <Container>
      <StatusBar style="light" />
      <SearchInput
        placeholder="Search"
        placeholderTextColor={theme.grey}
        iconColor={theme.grey}
        ref={ref=>reference=ref}
        theme={{
          colors: {
            text: theme.white,
          },
        }}
        onIconPress={()=>reference.focus()}
      />
      <BottomNavigationBar />
    </Container>
  );
};
export default Search;
