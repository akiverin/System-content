import axios from "axios";

export const GET_GROUP_REQUEST = "GET_GROUP_REQUEST";
export const GET_GROUP_SUCCESS = "GET_GROUP_SUCCESS";
export const GET_GROUP_FAIL = "GET_GROUP_FAIL";

export const GET_ALL_GROUPS_REQUEST = "GET_ALL_GROUPS_REQUEST";
export const GET_ALL_GROUPS_SUCCESS = "GET_ALL_GROUPS_SUCCESS";
export const GET_ALL_GROUPS_FAIL = "GET_ALL_GROUPS_FAIL";

export const PATCH_GROUP_REQUEST = "PATCH_GROUP_REQUEST";
export const PATCH_GROUP_SUCCESS = "PATCH_GROUP_SUCCESS";
export const PATCH_GROUP_FAIL = "PATCH_GROUP_FAIL";

export const DELETE_GROUP_REQUEST = "DELETE_GROUP_REQUEST";
export const DELETE_GROUP_SUCCESS = "DELETE_GROUP_SUCCESS";
export const DELETE_GROUP_FAIL = "DELETE_GROUP_FAIL";

export const CREATE_GROUP_REQUEST = "CREATE_GROUP_REQUEST";
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";
export const CREATE_GROUP_FAIL = "CREATE_GROUP_FAIL";

export const ADD_GROUP_MEMBER_REQUEST = "ADD_GROUP_MEMBER_REQUEST";
export const ADD_GROUP_MEMBER_SUCCESS = "ADD_GROUP_MEMBER_SUCCESS";
export const ADD_GROUP_MEMBER_FAIL = "ADD_GROUP_MEMBER_FAIL";

export const REMOVE_GROUP_MEMBER_REQUEST = "REMOVE_GROUP_MEMBER_REQUEST";
export const REMOVE_GROUP_MEMBER_SUCCESS = "REMOVE_GROUP_MEMBER_SUCCESS";
export const REMOVE_GROUP_MEMBER_FAIL = "REMOVE_GROUP_MEMBER_FAIL";

export const getGroup = (groupId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_GROUP_REQUEST });
    const { data } = await axios.get(`/api/groups/${groupId}`, config);
    dispatch({ type: GET_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_GROUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllGroups = () => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: GET_ALL_GROUPS_REQUEST });
    const { data } = await axios.get("/api/groups/", config);
    dispatch({ type: GET_ALL_GROUPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_GROUPS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createGroup = (groupData) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: CREATE_GROUP_REQUEST });
    const { data } = await axios.post("/api/groups/", groupData, config);
    dispatch({ type: CREATE_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_GROUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateGroup = (groupId, groupData) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: PATCH_GROUP_REQUEST });
    const { data } = await axios.patch(
      `/api/groups/${groupId}`,
      groupData,
      config
    );
    dispatch({ type: PATCH_GROUP_SUCCESS, payload: data });
    dispatch(getGroup(groupId)); // Обновляем данные группы в store
  } catch (error) {
    dispatch({
      type: PATCH_GROUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteGroup = (groupId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: DELETE_GROUP_REQUEST });
    const { data } = await axios.delete(`/api/groups/${groupId}`, config);
    dispatch({ type: DELETE_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_GROUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addGroupMember = (groupId, userId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: ADD_GROUP_MEMBER_REQUEST });
    const { data } = await axios.post(
      `/api/groups/${groupId}/members`,
      { userId },
      config
    );
    dispatch({ type: ADD_GROUP_MEMBER_SUCCESS, payload: data });
    dispatch(getGroup(groupId)); // Обновляем данные группы
  } catch (error) {
    dispatch({
      type: ADD_GROUP_MEMBER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeGroupMember = (groupId, userId) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const config = {
      headers: {
        Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
      },
    };
    dispatch({ type: REMOVE_GROUP_MEMBER_REQUEST });
    const { data } = await axios.delete(
      `/api/groups/${groupId}/members/${userId}`,
      config
    );
    dispatch({ type: REMOVE_GROUP_MEMBER_SUCCESS, payload: data });
    dispatch(getGroup(groupId)); // Обновляем данные группы
  } catch (error) {
    dispatch({
      type: REMOVE_GROUP_MEMBER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchGroups = (searchTerm) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: GET_ALL_GROUPS_REQUEST });
    const { data } = await axios.get(
      `/api/groups?search=${searchTerm}`,
      config
    );
    dispatch({ type: GET_ALL_GROUPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_GROUPS_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
