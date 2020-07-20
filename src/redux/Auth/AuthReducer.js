import { USER_STATE_CHANGE } from "./AuthActionType";

const InitialState = {
  AuthValue: false,
};

const AuthReducer = (state = InitialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        AuthValue: action.val,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        AuthValue: false,
      };
    default:
      return state;
  }
};
export default AuthReducer;
