import {
  CREATE_USER_FAILURE,
  CREATE_USER_INITIATE,
  CREATE_USER_SUCCESS,
} from "./action.types";

const initialState = {
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
    default:
      return state;
  }
};

export default userReducer;
