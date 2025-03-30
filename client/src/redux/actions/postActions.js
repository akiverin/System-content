import axios from "axios";

export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAIL = "GET_POST_FAIL";

export const GET_ALL_POSTS_REQUEST = "GET_ALL_POSTS_REQUEST";
export const GET_ALL_POSTS_SUCCESS = "GET_ALL_POSTS_SUCCESS";
export const GET_ALL_POSTS_FAIL = "GET_ALL_POSTS_FAIL";

export const PATCH_POST_REQUEST = "PATCH_POST_REQUEST";
export const PATCH_POST_SUCCESS = "PATCH_POST_SUCCESS";
export const PATCH_POST_FAIL = "PATCH_POST_FAIL";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAIL = "DELETE_POST_FAIL";

export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAIL = "CREATE_POST_FAIL";

export const getPost = (postId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_POST_REQUEST });
    const { data } = await axios.get(`/api/posts/${postId}`, config);
    dispatch({ type: GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_ALL_POSTS_REQUEST });
    const { data } = await axios.get("/api/posts/", config);
    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const patchPost = (postId, postData, imageFile) => async (dispatch) => {
  try {
    dispatch({ type: PATCH_POST_REQUEST });

    const formData = new FormData();
    for (const key in postData) {
      formData.append(key, postData[key]);
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
      `/api/posts/${postId}`,
      formData,
      config
    );

    dispatch({ type: PATCH_POST_SUCCESS, payload: data });
    dispatch(getPost(postId));
  } catch (error) {
    dispatch({
      type: PATCH_POST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createPost = (title, desc, text, tags) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: CREATE_POST_REQUEST });
    const { data } = await axios.post(
      `/api/posts/`,
      { title, desc, text, tags },
      config
    );
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: DELETE_POST_REQUEST });
    const { data } = await axios.delete(`/api/posts/${postId}`, config);
    dispatch({ type: DELETE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
