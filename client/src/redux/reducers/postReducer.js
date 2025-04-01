import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAIL,
  PATCH_POST_REQUEST,
  PATCH_POST_SUCCESS,
  PATCH_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from "../actions/postActions";

const initialState = {
  post: {},
  allPosts: [],
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
    case GET_ALL_POSTS_REQUEST:
    case PATCH_POST_REQUEST:
    case DELETE_POST_REQUEST:
    case CREATE_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_POST_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case CREATE_POST_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case GET_ALL_POSTS_SUCCESS:
      return { ...state, loading: false, allPosts: action.payload };
    case PATCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          ...action.payload,
          image: action.payload.image || state.post.image,
        },
        error: null,
      };
    case DELETE_POST_SUCCESS:
      return { ...state, loading: false, post: {} };
    case GET_POST_FAIL:
    case GET_ALL_POSTS_FAIL:
    case PATCH_POST_FAIL:
    case DELETE_POST_FAIL:
    case CREATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
