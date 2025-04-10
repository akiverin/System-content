import {
  GET_TAG_REQUEST,
  GET_TAG_SUCCESS,
  GET_TAG_FAIL,
  GET_ALL_TAGS_REQUEST,
  GET_ALL_TAGS_SUCCESS,
  GET_ALL_TAGS_FAIL,
  PATCH_TAG_REQUEST,
  PATCH_TAG_SUCCESS,
  PATCH_TAG_FAIL,
  DELETE_TAG_REQUEST,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAIL,
  CREATE_TAG_REQUEST,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAIL,
} from "../actions/tagActions";

const initialState = {
  tag: {},
  allTags: [],
  loading: false,
  error: null,
};

export const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAG_REQUEST:
    case GET_ALL_TAGS_REQUEST:
    case PATCH_TAG_REQUEST:
    case DELETE_TAG_REQUEST:
    case CREATE_TAG_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TAG_SUCCESS:
      return { ...state, loading: false, tag: action.payload };
    case CREATE_TAG_SUCCESS:
      return { ...state, loading: false, tag: action.payload };
    case GET_ALL_TAGS_SUCCESS:
      return { ...state, loading: false, allTags: action.payload };
    case PATCH_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        tag: {
          ...state.tag,
          ...action.payload,
        },
        error: null,
      };
    case DELETE_TAG_SUCCESS:
      return { ...state, loading: false, tag: {} };
    case GET_TAG_FAIL:
    case GET_ALL_TAGS_FAIL:
    case PATCH_TAG_FAIL:
    case DELETE_TAG_FAIL:
    case CREATE_TAG_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
