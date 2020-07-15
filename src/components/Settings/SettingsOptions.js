import React from "react";
import styled from "styled-components/native";
import theme from "../../utils/theme";
import { Text } from "react-native-paper";

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  padding-top: 20px;
`;

const Options = styled.View`
  width: 90%;
  background-color: ${theme.lightWhite};
  height: 60px;
  align-self: center;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;
const OptionsText = styled(Text)`
  font-weight: bold;
  font-size: 20px;
`;

const SettingsOptions = () => {
  return (
    <Container>
      <ScrollView>
        <Options>
          <OptionsText>Account Options</OptionsText>
        </Options>
        <Options>
          <OptionsText>Notifications</OptionsText>
        </Options>
        <Options>
          <OptionsText>Logout</OptionsText>
        </Options>
      </ScrollView>
    </Container>
  );
};
export default SettingsOptions;
