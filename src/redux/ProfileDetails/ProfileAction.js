import { CHANGE_USER_DETAILS } from "./ProfileActionTypes";

const ProfileAction = (details) => {
  return {
    type: CHANGE_USER_DETAILS,
    name: details.name,
    username: details.username,
    bio: details.bio,
    followers: details.followers,
    following: details.following,
    likes: details.likes,
    uri: details.uri,
  };
};
export default ProfileAction;
