import {
  CREATE_USER_FAILURE,
  CREATE_USER_INITIATE,
  CREATE_USER_SUCCESS,
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
