import { createStore, combineReducers } from "redux";

import HomeReducer from "./HomeFeed/HomeReducer";
import AuthReducer from "./Auth/AuthReducer";
import ProfileReducer from "./ProfileDetails/ProfileReducers";

const AppReducer = combineReducers({
  home: HomeReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
});

export default createStore(AppReducer);
