import {

  ADD_USERS
} from "./action.types";

export const AadUsers = (users)=>({
  type:ADD_USERS,
  payload:users
})