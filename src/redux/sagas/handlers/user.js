import { call, put } from "redux-saga/effects";
import {
  addToLocalStorage,
  removeFromLocalStorage,
} from "../../../utils/setLocalStorage";
import {
  createUserFailure,
  createUserSuccess,
  loginUserFailure,
  loginUserSuccess,
} from "../../user/action";
import { requestCreateUser, requestLoginUser } from "../requests/user";

export function* handleLoginUser(action) {
  try {
    const {data} = yield call(requestLoginUser, action.payload);
    yield put(loginUserSuccess(data));
    yield addToLocalStorage("user", data);
  } catch (err) {
    yield put(loginUserFailure(err.message));
  }
}

export function* handleLogOutUser() {
  try {
    yield removeFromLocalStorage("user");
  } catch (err) {
    console.log("err", err);
  }
}

export function* handleCreateUser(action) {
  try {
    const response = yield call(requestCreateUser, action.payload);
    const { data } = response;
    yield put(createUserSuccess({ ...data, ...action.payload }));
  } catch (err) {
    yield put(createUserFailure(err.message));
  }
}
