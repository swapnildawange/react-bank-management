import {
  GET_USERS_FAILURE,
  GET_USERS_INITIATE,
  GET_USERS_SUCCESS,
} from "./action.types";

export const getUsersInitiate = (token) => ({
  type: GET_USERS_INITIATE,
  payload: token,
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersFailure = (error) => ({
  type: GET_USERS_FAILURE,
  payload: error,
});
