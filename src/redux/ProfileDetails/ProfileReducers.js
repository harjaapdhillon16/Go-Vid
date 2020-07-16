import { CHANGE_USER_DETAILS } from "./ProfileActionTypes";

const initialState = {
  name: "",
  username: "",
  bio: "",
  followers: "",
  following: "",
  likes: "",
  uri: "",
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER_DETAILS:
      return {
        ...state,
        name: action.name,
        username: action.username,
        bio: action.bio,
        followers: action.followers,
        following: action.following,
        likes: action.likes,
        uri: action.uri,
      };
    default:
      return state;
  }
};
export default ProfileReducer;
