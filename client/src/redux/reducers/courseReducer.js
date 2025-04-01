import {
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAIL,
  GET_ALL_COURSES_REQUEST,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAIL,
  PATCH_COURSE_REQUEST,
  PATCH_COURSE_SUCCESS,
  PATCH_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
} from "../actions/courseActions";

const initialState = {
  course: {},
  allCourses: [],
  loading: false,
  error: null,
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_REQUEST:
    case GET_ALL_COURSES_REQUEST:
    case PATCH_COURSE_REQUEST:
    case DELETE_COURSE_REQUEST:
    case CREATE_COURSE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_COURSE_SUCCESS:
      return { ...state, loading: false, course: action.payload };
    case CREATE_COURSE_SUCCESS:
      return { ...state, loading: false, course: action.payload };
    case GET_ALL_COURSES_SUCCESS:
      return { ...state, loading: false, allCourses: action.payload };
    case PATCH_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        course: {
          ...state.course,
          ...action.payload,
          image: action.payload.image || state.course.image,
        },
        error: null,
      };
    case DELETE_COURSE_SUCCESS:
      return { ...state, loading: false, course: {} };
    case GET_COURSE_FAIL:
    case GET_ALL_COURSES_FAIL:
    case PATCH_COURSE_FAIL:
    case DELETE_COURSE_FAIL:
    case CREATE_COURSE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
