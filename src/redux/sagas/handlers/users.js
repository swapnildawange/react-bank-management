import { call, put } from "redux-saga/effects";
import { getUsersFailure, getUsersSuccess } from "../../users/action";
import { requestGetUsers } from "../requests/users";

export function* handleGetUsers(action) {
  try {
    const response = yield call(requestGetUsers, action.payload);
    const { data } = response;
    yield put(getUsersSuccess(data));
  } catch (err) {
    // console.log("err", err.message);

    yield put(getUsersFailure(err.message));
  }
}

// export function* handleLogOutUser() {
//   try {
//     yield removeFromLocalStorage("user");
//   } catch (err) {
//     console.log("err", err);
//   }
// }

// export function* handleCreateUser(action) {
//   try {
//     const response = yield call(requestCreateUser, action.payload);
//     const { data } = response;
//     yield put(createUserSuccess({ ...data, ...action.payload }));
//   } catch (err) {
//     yield put(createUserFailure(err.message));
//   }
// }
