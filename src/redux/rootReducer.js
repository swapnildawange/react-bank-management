import { applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import userReducer from "./user/userReducer";
import usersReducer from "./users/usersReducer";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default combineReducers(
  {
    user: userReducer,
    users: usersReducer,
  },
  applyMiddleware(sagaMiddleware)
);
