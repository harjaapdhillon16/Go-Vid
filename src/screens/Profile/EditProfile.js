import React from "react";
import styled from "styled-components/native";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import { Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../../config";
import * as SecureStore from "expo-secure-store";

import theme from "../../utils/theme";
import EditImage from "../../components/EditProfile/EditImage";
import EditDetails from "../../components/EditProfile/EditDetails";
import ProfileAction from "../../redux/ProfileDetails/ProfileAction";
import axiosInstance from "../../api/instance";

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

const Done = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  padding:10px 20px;
  border-radius:10px;
  right: 10px;
  border: 1px solid ${theme.blue};
`;

const ScrollView = styled.ScrollView``;

const Loading = () => (
  <ActivityIndicator color={theme.blue} size={30} style={{ paddingTop: 5 }} />
);

const DONE = () => <Text style={{color:theme.white}}>DONE</Text>;

const EditProfile = (props) => {
  const data = useSelector((state) => state.profile);
  const Dispatch = useDispatch();
  const navigation = useNavigation();
  const [Name, _setName] = React.useState("");
  const [Username, _setUsername] = React.useState("");
  const [Bio, _setBio] = React.useState("");
  const [Uri, _setUri] = React.useState("");
  const [changes, setChange] = React.useState(false);
  const [status, _setStatus] = React.useState(false);
  const [UsernameConstants, _setUsernameConstants] = React.useState("");
  const [ImageChanged, _setImageChanged] = React.useState(false);
  const [button, _setButton] = React.useState(<DONE />);

  async function update() {
    const uid = await SecureStore.getItemAsync("user");
    firebase
      .database()
      .ref(`users/${uid}`)
      .once("value", (snap) => {
        Dispatch(ProfileAction(snap.val()));
      });
  }

  React.useState(() => {
    if (data.name !== "") {
      _setName(data.name);
      _setUsername(data.username);
      _setBio(data.bio);
      _setUri(data.uri);
      _setUsernameConstants(data.username);
    }
  }, [data]);
  const ChangeValues = async () => {
    _setButton(<Loading />);
    const uid = await SecureStore.getItemAsync("user");
    if (changes === true) {
      let user;

      if (status === true) {
        user = Username;
      } else {
        user = UsernameConstants;
      }

      await firebase.database().ref(`users/${uid}`).update({
        name: Name,
        bio: Bio,
        username: user,
      });

      if (ImageChanged === true) {
        const formData = new FormData();
        formData.append("image", {
          name: uid,
          type: "image/jpg",
          uri: Uri,
        });

        await axiosInstance.post("/profilePicture", formData).then(() => {
          update();
          navigation.goBack();
        });
      } else {
        navigation.goBack();
        update();
      }
    } else if (ImageChanged === true) {
      if (ImageChanged === true) {
        const formData = new FormData();
        formData.append("image", {
          name: uid,
          type: "image/jpg",
          uri: Uri,
        });

        await axiosInstance.post("/profilePicture", formData).then(() => {
          update();
          navigation.goBack();
        });
      }
    } else {
      navigation.goBack();
    }
  };
  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps='always'>
        <Row>
          <Heading>Edit Profile</Heading>
        </Row>
        <Done
          onPress={() => ChangeValues()}
          labelStyle={{ color: theme.blue, fontWeight: "bold" }}
        >
          {button}
        </Done>

        <EditImage
          uri={Uri}
          setUri={(u) => _setUri(u)}
          _setImageChanged={() => _setImageChanged(true)}
          setChange={() => setChange(true)}
        />
        <EditDetails
          name={Name}
          setName={(e) => _setName(e)}
          username={Username}
          setUsername={(e) => _setUsername(e)}
          bio={Bio}
          setBio={(e) => _setBio(e)}
          setChange={() => setChange(true)}
          setStatus={(e) => _setStatus(e)}
        />
      </ScrollView>
    </Container>
  );
};
export default EditProfile;
