import { CHANGE_USER_PROFILE } from "./UserProfileActionType";

const UserProfileAction = (uid, uri, username) => {
  return {
    type: CHANGE_USER_PROFILE,
    uid: uid,
    uri: uri,
    username: username,
  };
};
export default UserProfileAction;
