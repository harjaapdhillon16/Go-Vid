import React from "react";
import styled from "styled-components/native";
import { Title, Text } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { StatusBar, setStatusBarHidden } from "expo-status-bar";
import Constants from "expo-constants";
import { Keyboard } from "react-native";

import SlidingFeed from "../../components/Search/SlidingFeed";
import theme from "../../utils/theme";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
  padding-top: ${Constants.statusBarHeight + 5}px;
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

const SearchAlert = styled(Text)`
  color: ${theme.white};
  width: 90%;
  text-align: center;
  font-size: 18px;
  align-self: center;
  padding-top: 10px;
  font-weight: bold;
`;

const SearchText = () => (
  <SearchAlert>
    Search is still development, still you can enjoy in the home and explore
    feeds!
  </SearchAlert>
);

const Search = ({ navigation }) => {
  React.useEffect(() => {
    navigation.addListener("focus", () => setStatusBarHidden(false, "none"));
  });
  let reference;
  const [keyboardFocused, _setKeyboard] = React.useState(false);

  const [searchFocused, _setSearchFocused] = React.useState(false);

  return (
    <Container
      onTouchEndCapture={() => {
        if (keyboardFocused) {
          Keyboard.dismiss();
          _setSearchFocused(false);
          _setKeyboard(false);
        }
      }}
    >
      <StatusBar style="light" />
      <SearchInput
        placeholder="Search"
        placeholderTextColor={theme.grey}
        iconColor={theme.grey}
        ref={(ref) => (reference = ref)}
        theme={{
          colors: {
            text: theme.white,
          },
        }}
        onFocus={() => {
          _setSearchFocused(true);
          _setKeyboard(true);
        }}
        onBlur={() => {
          _setSearchFocused(false);
          _setKeyboard(false);
        }}
        onIconPress={() => reference.focus()}
      />
      {searchFocused ? <SearchText /> : <SlidingFeed />}
      <BottomNavigationBar />
    </Container>
  );
};
export default Search;
