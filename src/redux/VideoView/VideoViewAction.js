import { CHANGE_VIDEO_VIEW_INDEX } from "./VideoViewActionType";

const VideoViewAction = (data, index) => {
  return {
    type: CHANGE_VIDEO_VIEW_INDEX,
    data: data,
    index: index,
  };
};
export default VideoViewAction;