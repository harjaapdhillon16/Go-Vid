import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";

import theme from "../../utils/theme";

const Container = styled.View`
  color: ${theme.black};
  border: 2px solid ${theme.white};
  flex: 1;
`;

const PrivateCard = () => {
  return (
    <Container>
      <Text>hello</Text>
    </Container>
  );
};
export default PrivateCard;
