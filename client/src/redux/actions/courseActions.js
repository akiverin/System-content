import axios from "axios";

export const GET_COURSE_REQUEST = "GET_COURSE_REQUEST";
export const GET_COURSE_SUCCESS = "GET_COURSE_SUCCESS";
export const GET_COURSE_FAIL = "GET_COURSE_FAIL";

export const GET_ALL_COURSES_REQUEST = "GET_ALL_COURSES_REQUEST";
export const GET_ALL_COURSES_SUCCESS = "GET_ALL_COURSES_SUCCESS";
export const GET_ALL_COURSES_FAIL = "GET_ALL_COURSES_FAIL";

export const PATCH_COURSE_REQUEST = "PATCH_COURSE_REQUEST";
export const PATCH_COURSE_SUCCESS = "PATCH_COURSE_SUCCESS";
export const PATCH_COURSE_FAIL = "PATCH_COURSE_FAIL";

export const DELETE_COURSE_REQUEST = "DELETE_COURSE_REQUEST";
export const DELETE_COURSE_SUCCESS = "DELETE_COURSE_SUCCESS";
export const DELETE_COURSE_FAIL = "DELETE_COURSE_FAIL";

export const CREATE_COURSE_REQUEST = "CREATE_COURSE_REQUEST";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const CREATE_COURSE_FAIL = "CREATE_COURSE_FAIL";

export const getCourse = (courseId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_COURSE_REQUEST });
    const { data } = await axios.get(`/api/courses/${courseId}`, config);
    dispatch({ type: GET_COURSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllCourses = () => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_ALL_COURSES_REQUEST });
    const { data } = await axios.get("/api/courses/", config);
    dispatch({ type: GET_ALL_COURSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const patchCourse =
  (courseId, courseData, imageFile) => async (dispatch) => {
    try {
      dispatch({ type: PATCH_COURSE_REQUEST });

      const formData = new FormData();
      for (const key in courseData) {
        formData.append(key, courseData[key]);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
        },
      };

      const { data } = await axios.patch(
        `/api/courses/${courseId}`,
        formData,
        config
      );

      dispatch({ type: PATCH_COURSE_SUCCESS, payload: data });
      dispatch(getCourse(courseId));
    } catch (error) {
      dispatch({
        type: PATCH_COURSE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
      },
    };
    const { data } = await axios.post("/api/courses/", courseData, config);
    dispatch({ type: CREATE_COURSE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const deleteCourse = (courseId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: DELETE_COURSE_REQUEST });
    const { data } = await axios.delete(`/api/courses/${courseId}`, config);
    dispatch({ type: DELETE_COURSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
