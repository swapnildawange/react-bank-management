import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import usersReducer from "./users/usersReducer";

export default combineReducers({
  user: userReducer,
  users: usersReducer,
});
