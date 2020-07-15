import { CHANGE_INDEX } from "./HomeActionTypes";

const ChangeIndex = (index) => {
  return {
    type: CHANGE_INDEX,
    index: index,
  };
};
export default ChangeIndex;