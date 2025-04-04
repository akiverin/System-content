import {
  GET_GROUP_REQUEST,
  GET_GROUP_SUCCESS,
  GET_GROUP_FAIL,
  GET_ALL_GROUPS_REQUEST,
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_GROUPS_FAIL,
  PATCH_GROUP_REQUEST,
  PATCH_GROUP_SUCCESS,
  PATCH_GROUP_FAIL,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAIL,
  ADD_GROUP_MEMBER_REQUEST,
  ADD_GROUP_MEMBER_SUCCESS,
  ADD_GROUP_MEMBER_FAIL,
  REMOVE_GROUP_MEMBER_REQUEST,
  REMOVE_GROUP_MEMBER_SUCCESS,
  REMOVE_GROUP_MEMBER_FAIL,
} from "../actions/groupActions";

const initialState = {
  group: {},
  allGroups: [],
  loading: false,
  error: null,
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    // Общие случаи для начала загрузки
    case GET_GROUP_REQUEST:
    case GET_ALL_GROUPS_REQUEST:
    case PATCH_GROUP_REQUEST:
    case DELETE_GROUP_REQUEST:
    case CREATE_GROUP_REQUEST:
    case ADD_GROUP_MEMBER_REQUEST:
    case REMOVE_GROUP_MEMBER_REQUEST:
      return { ...state, loading: true, error: null };

    // Успешное получение одной группы
    case GET_GROUP_SUCCESS:
      return { ...state, loading: false, group: action.payload };

    // Успешное создание группы
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        group: action.payload,
        allGroups: [...state.allGroups, action.payload],
      };

    // Успешное получение всех групп
    case GET_ALL_GROUPS_SUCCESS:
      return { ...state, loading: false, allGroups: action.payload };

    // Успешное обновление группы
    case PATCH_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        group: action.payload,
        allGroups: state.allGroups.map((group) =>
          group._id === action.payload._id ? action.payload : group
        ),
      };

    // Успешное удаление группы
    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        group: {},
        allGroups: state.allGroups.filter(
          (group) => group._id !== action.payload._id
        ),
      };

    // Успешное добавление участника
    case ADD_GROUP_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        group: action.payload,
        allGroups: state.allGroups.map((group) =>
          group._id === action.payload._id ? action.payload : group
        ),
      };

    // Успешное удаление участника
    case REMOVE_GROUP_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        group: action.payload,
        allGroups: state.allGroups.map((group) =>
          group._id === action.payload._id ? action.payload : group
        ),
      };

    // Обработка ошибок
    case GET_GROUP_FAIL:
    case GET_ALL_GROUPS_FAIL:
    case PATCH_GROUP_FAIL:
    case DELETE_GROUP_FAIL:
    case CREATE_GROUP_FAIL:
    case ADD_GROUP_MEMBER_FAIL:
    case REMOVE_GROUP_MEMBER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
