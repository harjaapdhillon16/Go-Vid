import { createStore, combineReducers } from "redux";

import HomeReducer from "./HomeFeed/HomeReducer";
import AuthReducer from "./Auth/AuthReducer";
import ProfileReducer from "./ProfileDetails/ProfileReducers";
import UserProfileReducer from "./UserProfile/UserProfileReducer";
import VideoViewReducer from "./VideoView/VideoReducer";

const AppReducer = combineReducers({
  home: HomeReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
  userProfile: UserProfileReducer,
  videoView: VideoViewReducer,
});

export default createStore(AppReducer);
