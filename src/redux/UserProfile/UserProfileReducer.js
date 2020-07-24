import { CHANGE_USER_PROFILE } from "./UserProfileActionType";

const initialState = {
  uid: "",
  uri: "",
  username: "",
};

const UserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER_PROFILE:
      return {
        ...state,
        uid: action.uid,
        uri: action.uri,
        username: action.username,
      };
    default:
      return state;
  }
};

export default UserProfileReducer;
