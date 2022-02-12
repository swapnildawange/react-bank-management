import { GET_USERS_FAILURE, GET_USERS_SUCCESS } from "./action.types";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: "",
  users: [],
};

const usersReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        users: action.payload,
      };
    case GET_USERS_FAILURE: {
      return {
        ...state,
        error: action.payload,
        users: [],
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
