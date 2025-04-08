import {
  GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_FAIL,
  GET_ALL_VIDEOS_REQUEST,
  GET_ALL_VIDEOS_SUCCESS,
  GET_ALL_VIDEOS_FAIL,
  PATCH_VIDEO_REQUEST,
  PATCH_VIDEO_SUCCESS,
  PATCH_VIDEO_FAIL,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAIL,
} from "../actions/videoActions";

const initialState = {
  video: {},
  allVideos: [],
  loading: false,
  error: null,
};

export const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEO_REQUEST:
    case GET_ALL_VIDEOS_REQUEST:
    case PATCH_VIDEO_REQUEST:
    case DELETE_VIDEO_REQUEST:
    case CREATE_VIDEO_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_VIDEO_SUCCESS:
      return { ...state, loading: false, video: action.payload };
    case CREATE_VIDEO_SUCCESS:
      return { ...state, loading: false, video: action.payload };
    case GET_ALL_VIDEOS_SUCCESS:
      return { ...state, loading: false, allVideos: action.payload };
    case PATCH_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          ...action.payload,
          image: action.payload.image || state.video.image,
        },
        error: null,
      };
    case DELETE_VIDEO_SUCCESS:
      return { ...state, loading: false, video: {} };
    case GET_VIDEO_FAIL:
    case GET_ALL_VIDEOS_FAIL:
    case PATCH_VIDEO_FAIL:
    case DELETE_VIDEO_FAIL:
    case CREATE_VIDEO_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
