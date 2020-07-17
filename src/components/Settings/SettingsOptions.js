import React from "react";
import styled from "styled-components/native";
import theme from "../../utils/theme";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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
const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

const CheckView = styled.View`
  flex-direction: row;
`;

const SettingsOptions = () => {
  const Navigation = useNavigation();

  return (
    <Container>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => Navigation.navigate("SettingsAccountOptions")}
        >
          <Options>
            <OptionsText>Account Options</OptionsText>
          </Options>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => Navigation.navigate("SettingsNotifications")}
        >
          <Options>
            <OptionsText>Notifications</OptionsText>
          </Options>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Options style={{ backgroundColor: theme.red, height: 60 }}>
            <OptionsText style={{ color: theme.white }}>Logout</OptionsText>
          </Options>
        </TouchableWithoutFeedback>
      </ScrollView>
    </Container>
  );
};
export default SettingsOptions;
