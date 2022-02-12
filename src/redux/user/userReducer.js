import {
  CREATE_USER_FAILURE,
  CREATE_USER_INITIATE,
  CREATE_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_INITIATE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_INFO,
} from "./action.types";

export const initialState = {
  isLoggedIn: false,
  isAuthenticated: false,
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
        isLoggedIn: false,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
        isAuthenticated: true,
        isLoggedIn: false,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
      };
    case LOGIN_USER_INITIATE:
      return {
        ...state,
        isLoading: true,
        error: "",
        userInfo: {},
        isAuthenticated: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
        isAuthenticated: true,
        isLoggedIn: true,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
