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

export const createUserInitiate = () => ({
  type: CREATE_USER_INITIATE,
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

export const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

export const loginUserInitiate = () => ({
  type: LOGIN_USER_INITIATE,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const updateUserInfo = (userInfo) => ({
  type: UPDATE_USER_INFO,
  payload: userInfo,
});
