import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";

import theme from "../../utils/theme";

const CommentInput = styled.TextInput`
  background-color: ${theme.lightBlack};
  width: 80%;
  height: 40px;
  align-self: center;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-radius: 5px;
`;
const CommentInputView = styled.View`
  width: 95%;
  height: 40px;
  align-self: center;
  align-items: center;
  margin-top: 10px;
  flex-direction: row;
  border-radius: 5px;
`;
const CommentButton = styled.View`
  background-color: ${theme.lightBlack};
  width: 20%;
  height: 40px;
  justify-content: center;
  border-radius: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;
const Post = styled(Text)`
  color: ${theme.white};
  align-self: center;
  font-weight: 600;
  color: ${theme.blue};
`;

const Comments = () => {
  return (
    <CommentInputView>
      <CommentInput />
      <CommentButton>
        <Post>POST</Post>
      </CommentButton>
    </CommentInputView>
  );
};

export default Comments;
