import axios from "axios";

export const GET_TAG_REQUEST = "GET_TAG_REQUEST";
export const GET_TAG_SUCCESS = "GET_TAG_SUCCESS";
export const GET_TAG_FAIL = "GET_TAG_FAIL";

export const GET_ALL_TAGS_REQUEST = "GET_ALL_TAGS_REQUEST";
export const GET_ALL_TAGS_SUCCESS = "GET_ALL_TAGS_SUCCESS";
export const GET_ALL_TAGS_FAIL = "GET_ALL_TAGS_FAIL";

export const PATCH_TAG_REQUEST = "PATCH_TAG_REQUEST";
export const PATCH_TAG_SUCCESS = "PATCH_TAG_SUCCESS";
export const PATCH_TAG_FAIL = "PATCH_TAG_FAIL";

export const DELETE_TAG_REQUEST = "DELETE_TAG_REQUEST";
export const DELETE_TAG_SUCCESS = "DELETE_TAG_SUCCESS";
export const DELETE_TAG_FAIL = "DELETE_TAG_FAIL";

export const CREATE_TAG_REQUEST = "CREATE_TAG_REQUEST";
export const CREATE_TAG_SUCCESS = "CREATE_TAG_SUCCESS";
export const CREATE_TAG_FAIL = "CREATE_TAG_FAIL";

export const getTag = (tagId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_TAG_REQUEST });
    const { data } = await axios.get(`/api/tags/${tagId}`, config);
    dispatch({ type: GET_TAG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllTags = () => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_ALL_TAGS_REQUEST });
    const { data } = await axios.get("/api/tags/", config);
    dispatch({ type: GET_ALL_TAGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_TAGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const patchTag = (tagId, tagData) => async (dispatch) => {
  try {
    dispatch({ type: PATCH_TAG_REQUEST });

    const formData = new FormData();
    for (const key in tagData) {
      formData.append(key, tagData[key]);
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
      },
    };

    const { data } = await axios.patch(`/api/tags/${tagId}`, formData, config);

    dispatch({ type: PATCH_TAG_SUCCESS, payload: data });
    dispatch(getTag(tagId));
  } catch (error) {
    dispatch({
      type: PATCH_TAG_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createTag = (title) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: CREATE_TAG_REQUEST });
    const { data } = await axios.tag(`/api/tags/`, { title }, config);
    dispatch({ type: CREATE_TAG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_TAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTag = (tagId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: DELETE_TAG_REQUEST });
    const { data } = await axios.delete(`/api/tags/${tagId}`, config);
    dispatch({ type: DELETE_TAG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_TAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
