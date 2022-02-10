import { ADD_USERS } from "./action.types";

const initialState = {
  isAuthenticated: true, //TODO : change to false
  isLoading: false,
  error: "",
  users: [],
};

const usersReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ADD_USERS:
      return {
        ...state,
        isAuthenticated: true, //TODO : change to false
        isLoading: false,
        users: [],
      };
    default:
      return state;
  }
};

export default usersReducer;
