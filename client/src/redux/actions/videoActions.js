import axios from "axios";

export const GET_VIDEO_REQUEST = "GET_VIDEO_REQUEST";
export const GET_VIDEO_SUCCESS = "GET_VIDEO_SUCCESS";
export const GET_VIDEO_FAIL = "GET_VIDEO_FAIL";

export const GET_ALL_VIDEOS_REQUEST = "GET_ALL_VIDEOS_REQUEST";
export const GET_ALL_VIDEOS_SUCCESS = "GET_ALL_VIDEOS_SUCCESS";
export const GET_ALL_VIDEOS_FAIL = "GET_ALL_VIDEOS_FAIL";

export const PATCH_VIDEO_REQUEST = "PATCH_VIDEO_REQUEST";
export const PATCH_VIDEO_SUCCESS = "PATCH_VIDEO_SUCCESS";
export const PATCH_VIDEO_FAIL = "PATCH_VIDEO_FAIL";

export const DELETE_VIDEO_REQUEST = "DELETE_VIDEO_REQUEST";
export const DELETE_VIDEO_SUCCESS = "DELETE_VIDEO_SUCCESS";
export const DELETE_VIDEO_FAIL = "DELETE_VIDEO_FAIL";

export const CREATE_VIDEO_REQUEST = "CREATE_VIDEO_REQUEST";
export const CREATE_VIDEO_SUCCESS = "CREATE_VIDEO_SUCCESS";
export const CREATE_VIDEO_FAIL = "CREATE_VIDEO_FAIL";

export const getVideo = (videoId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_VIDEO_REQUEST });
    const { data } = await axios.get(`/api/videos/${videoId}`, config);
    dispatch({ type: GET_VIDEO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllVideos = () => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_ALL_VIDEOS_REQUEST });
    const { data } = await axios.get("/api/videos/", config);
    dispatch({ type: GET_ALL_VIDEOS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_VIDEOS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const patchVideo =
  (videoId, videoData, imageFile) => async (dispatch) => {
    try {
      dispatch({ type: PATCH_VIDEO_REQUEST });

      const formData = new FormData();
      for (const key in videoData) {
        formData.append(key, videoData[key]);
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
        `/api/videos/${videoId}`,
        formData,
        config
      );

      dispatch({ type: PATCH_VIDEO_SUCCESS, payload: data });
      dispatch(getVideo(videoId));
    } catch (error) {
      dispatch({
        type: PATCH_VIDEO_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const createVideo = (formData) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    if (!userInfo) {
      throw new Error("Требуется авторизация");
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: CREATE_VIDEO_REQUEST });
    const { data } = await axios.post("/api/videos", formData, config);
    dispatch({ type: CREATE_VIDEO_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: CREATE_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};

export const deleteVideo = (videoId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: DELETE_VIDEO_REQUEST });
    const { data } = await axios.delete(`/api/videos/${videoId}`, config);
    dispatch({ type: DELETE_VIDEO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
