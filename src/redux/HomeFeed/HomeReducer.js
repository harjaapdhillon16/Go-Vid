import { CHANGE_INDEX } from "./HomeActionTypes";
const InitialIndexState = {
  no: 0,
};

const ChangeIndexAndState = (state = InitialIndexState, action) => {
  switch (action.type) {
    case CHANGE_INDEX:
      return {
        ...state,
        no: action.index,
      };
    default:
      return state;
  }
};
export default ChangeIndexAndState;
