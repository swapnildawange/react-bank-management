import axios from "axios";

export const requestLoginUser = (payload) => {
  return axios.request({
    method: "post",
    url: "http://localhost:33001/login",
    data: payload,
  });
};

export const requestCreateUser = (payload) => {
  return axios.request({
    method: "post",
    url: "http://localhost:33001/create-account",
    data: payload,
  });
};
