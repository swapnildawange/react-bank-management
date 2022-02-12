import { all, takeLatest } from "redux-saga/effects";
import {
  CREATE_USER_INITIATE,
  LOGIN_USER_INITIATE,
  LOGOUT_USER,
} from "../user/action.types";
import { GET_USERS_INITIATE } from "../users/action.types";
import {
  handleCreateUser,
  handleLoginUser,
  handleLogOutUser,
} from "./handlers/user";
import { handleGetUsers } from "./handlers/users";

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN_USER_INITIATE, handleLoginUser),
    takeLatest(LOGOUT_USER, handleLogOutUser),
    takeLatest(CREATE_USER_INITIATE, handleCreateUser),
    takeLatest(GET_USERS_INITIATE, handleGetUsers),
  ]);
}
