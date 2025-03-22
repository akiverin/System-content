import axios from "axios";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";

export const GET_ALL_USERS_REQUEST = "GET_ALL_USERS_REQUEST";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAIL = "GET_ALL_USERS_FAIL";

export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAIL = "PATCH_USER_FAIL";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const getUser = (userId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_USER_REQUEST });
    const { data } = await axios.get(`/api/users/${userId}`, config);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_ALL_USERS_REQUEST });
    const { data } = await axios.get("/api/users/", config);
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const patchUser =
  (userId, firstName, lastName, email) => async (dispatch) => {
    try {
      dispatch({ type: PATCH_USER_REQUEST });
      console.log(userId, firstName, lastName);
      const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
        },
      };
      const { data } = await axios.patch(
        `/api/users/${userId}`,
        { firstName, lastName, email },
        config
      );
      dispatch({ type: PATCH_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PATCH_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    const { data } = await axios.delete(`/api/users/${userId}`, config);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
