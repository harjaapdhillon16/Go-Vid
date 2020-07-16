import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import { Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import theme from "../../utils/theme";
import EditImage from "../../components/EditProfile/EditImage";
import EditDetails from "../../components/EditProfile/EditDetails";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
  background-color: ${theme.black};
  padding-top: 20px;
`;
const Heading = styled(Text)`
  color: ${theme.white};
  padding: 5px;
  font-weight: 600;
  font-size: 25px;
  margin-left: 10px;
  align-self: center;
`;

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
const Icon = styled(MaterialIcons)`
  font-weight: bold;
  padding: 5px;
`;

const ScrollView = styled.ScrollView``;

const EditProfile = (props) => {
  const data = useSelector((state) => state.profile);

  const [Name, _setName] = React.useState("");
  const [Username, _setUsername] = React.useState("");
  const [Bio, _setBio] = React.useState("");
  const [Uri, _setUri] = React.useState("");

  React.useState(() => {
    if (data.name !== "") {
      _setName(data.name);
      _setUsername(data.username);
      _setBio(data.bio);
      _setUri(data.uri);
    }
  }, [data]);

  const navigation = useNavigation();
  return (
    <Container>
      <ScrollView>
        <Row>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color={theme.white}
          />
          <Heading>Edit Profile</Heading>
        </Row>
        <EditImage uri={Uri} />
        <EditDetails
          name={Name}
          setName={(e) => _setName(e)}
          username={Username}
          setUsername={(e) => _setUsername(e)}
          bio={Bio}
          setBio={(e) => _setBio}
        />
      </ScrollView>
    </Container>
  );
};
export default EditProfile;
