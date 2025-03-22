import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "../actions/authActions";

const storedUser = localStorage.getItem("userInfo");
const initialState = {
  loading: false,
  error: null,
  user: storedUser
    ? {
        userId: JSON.parse(storedUser).userId,
        token: JSON.parse(storedUser).token,
        isAuthenticated: true,
      }
    : {
        userId: null,
        token: null,
        isAuthenticated: false,
      },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          userId: action.payload.userId,
          token: action.payload.token,
          isAuthenticated: true,
        },
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return {
        loading: false,
        error: null,
        user: { userId: null, token: null, isAuthenticated: false },
      };
    default:
      return state;
  }
};
