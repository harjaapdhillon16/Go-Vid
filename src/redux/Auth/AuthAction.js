import { USER_STATE_CHANGE } from "./AuthActionType";

const AuthAction = (val) => {
  return {
    type: USER_STATE_CHANGE,
    val: val,
  };
};
export default AuthAction;