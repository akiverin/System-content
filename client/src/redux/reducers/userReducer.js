// src/redux/reducers/userReducer.js
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../actions/userActions";

const initialState = {
  user: {},
  allUsers: [],
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
    case GET_ALL_USERS_REQUEST:
    case PATCH_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, loading: false, allUsers: action.payload };
    case PATCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, user: {} };
    case GET_USER_FAIL:
    case GET_ALL_USERS_FAIL:
    case PATCH_USER_FAIL:
    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
