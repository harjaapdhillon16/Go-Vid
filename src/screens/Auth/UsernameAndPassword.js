import React from "react";
import styled from "styled-components/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Constants from "expo-constants";


import UsernameAndPasswordInput from "../../components/Auth/UsernameAndPasswordInput";

import theme from "../../utils/theme";

const Icons = styled(MaterialIcons)`
  position: absolute;
  top: 10px;
  transform: rotateZ(45deg);
  left: 10px;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${theme.black};
`;

const ScrollView = styled.ScrollView`
  margin-top:${Constants.statusBarHeight}px;
`


class UsernameAndPassword extends React.Component {

  render() {
    return (
      <Container>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icons
            onPress={() => this.props.navigation.goBack()}
            color={theme.white}
            size={30}
            name="add-circle"
          />
          <UsernameAndPasswordInput navigation={this.props.navigation} />
        </ScrollView>
      </Container>
    );
  }
}
export default UsernameAndPassword;
