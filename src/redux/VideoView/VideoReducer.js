import { CHANGE_VIDEO_VIEW_INDEX } from "./VideoViewActionType";

const InitialState = {
  data: [],
  index: 0,
};

const VideoReducer = (state = InitialState, action) => {
  switch (action.type) {
    case CHANGE_VIDEO_VIEW_INDEX:
      return {
        ...state,
        data: action.data,
        index: action.index,
      };
    default:
      return state;
  }
};
export default VideoReducer;
