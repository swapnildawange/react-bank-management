import {
  ADD_USER_INFO,
  CREATE_USER_FAILURE,
  CREATE_USER_INITIATE,
  CREATE_USER_SUCCESS,
  REMOVE_USER_INFO
} from "./action.types";

const initialState = {
  isAuthenticated: true, //TODO : change to false
  isLoading: false,
  userInfo: {},
  error: "",
};

const userReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case CREATE_USER_INITIATE:
      return {
        ...state,
        isLoading: true,
        error: "",
        userInfo: {},
        isAuthenticated: false,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
        isAuthenticated: true,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_USER_INFO:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
        isAuthenticated: true,
      };
    case REMOVE_USER_INFO:
      return {
        ...state,
        isLoading: false,
        error: "",
        userInfo: {},
        isAuthenticated: true, //TODO : change to false
      };
    default:
      return state;
  }
};

export default userReducer;
