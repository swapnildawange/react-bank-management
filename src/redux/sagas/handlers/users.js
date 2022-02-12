import { call, put } from "redux-saga/effects";
import { getUsersFailure, getUsersSuccess } from "../../users/action";
import { requestGetUsers } from "../requests/users";

export function* handleGetUsers(action) {
  try {
    const {data} = yield call(requestGetUsers, action.payload);
    yield put(getUsersSuccess(data));
  } catch (err) {
    yield put(getUsersFailure(err.message));
  }
}

