import React from "react";
import styled from "styled-components/native";
import { Title } from "react-native-paper";

import theme from "../../utils/theme";

const Container = styled.View`
  background-color: ${theme.black};
  flex: 1;
`;

const Heading = styled(Title)`
  color: ${theme.white};
`;

const Upload = () => {
  return (
    <Container>
      <Heading>Hello Upload</Heading>
    </Container>
  );
};
export default Upload;
