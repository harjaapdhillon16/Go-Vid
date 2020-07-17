import React from "react";
import styled from "styled-components/native";
import { TextInput, Text, ActivityIndicator } from "react-native-paper";
import { TextInput as ReactInput } from "react-native";
import Lodash from "lodash.debounce";

import UsernameApi from "../../api/usernameApi";
import theme from "../../utils/theme";

const Container = styled.View`
  padding-bottom: 300px;
  padding-top: 20px;
`;
const Input = styled(TextInput)`
  background-color: ${theme.lightBlack};
  width: 80%;
  align-self: center;
  height: 20px;
  font-size: 15px;
  padding: 10px;
  margin-top: 5px;
`;
const SmallText = styled(Text)`
  color: ${theme.white};
  width: 80%;
  align-self: center;
  font-weight: bold;
`;
const MultipleLines = styled(ReactInput)`
  background-color: ${theme.lightBlack};
  width: 80%;
  align-self: center;
  padding: 10px;
  color: ${theme.white};
  padding-left: 20px;
`;

const SuccessText = styled(Text)`
  color: ${theme.primaryColor};
  align-self: center;
`;

const FailureText = styled(Text)`
  color: ${theme.red};
  align-self: center;
`;

const LoadingView = styled.View`
  flex-direction: row;
  width: 80%;
  align-self: center;
`;
const Username = styled(Text)`
  color: ${theme.white};
  font-weight: bold;
`;

const Success = () => <SuccessText>username available</SuccessText>;

const Failure = () => <FailureText>username unavailable</FailureText>;

class EditDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      loading: false,
      success: null,
      usernameConstant: this.props.username,
    };
  }

  async apiCheck(e) {
    const { setStatus } = this.props;
    const result = await UsernameApi(e);
    if (result === true) {
      this.setState({ loading: false });
      setStatus(true);
      this.setState({ success: <Success /> });
    } else {
      this.setState({ loading: false });
      if (this.state.usernameConstant !== e) {
        this.setState({ success: <Failure /> });
      }
    }
  }

  async usernameCheck(e) {
    const { setUsername, setStatus,setChange } = this.props;
    this.setState({ loading: false });
    this.setState({ success: false });
    setStatus(false);
    setChange(true)
    if (e.length > 1) {
      this.setState({ loading: true });
      await setUsername(e);
      this.apiCheck(e);
    } else {
      this.setState({ loading: false });
      await setUsername(e);
    }
  }
  componentDidMount() {
    this.apiCheck = Lodash(this.apiCheck, 600);
  }
  render() {
    const {
      name,
      username,
      bio,
      setName,
      setUsername,
      setBio,
      setChange,
    } = this.props;

    return (
      <Container>
        <SmallText>Name</SmallText>
        <Input
          theme={{
            colors: {
              text: theme.white,
              primary: theme.primaryColor,
              underlineColor: theme.white,
            },
          }}
          value={name}
          onChangeText={(e) => {
            setName(e);
            setChange();
          }}
        />
        <LoadingView>
          <Username style={{ paddingTop: 10 }}>Username</Username>
          {this.state.loading ? (
            <ActivityIndicator
              color={theme.primaryColor}
              style={{ marginTop: 6, marginLeft: 10 }}
              size={15}
            />
          ) : null}
        </LoadingView>
        <Input
          theme={{
            colors: {
              text: theme.white,
              primary: theme.primaryColor,
              underlineColor: theme.white,
            },
          }}
          value={username}
          onChangeText={(e) => this.usernameCheck(e)}
        />
        {this.state.success}
        <SmallText style={{ paddingTop: 10 }}>Bio</SmallText>
        <MultipleLines
          multiline={true}
          numberOfLines={4}
          value={bio}
          onChangeText={(e) => {
            setBio(e);
            setChange();
          }}
        />
        <Text
          style={{ color: theme.lightWhite, width: "80%", alignSelf: "center" }}
        >
          Max 200 words
        </Text>
      </Container>
    );
  }
}
export default EditDetails;
