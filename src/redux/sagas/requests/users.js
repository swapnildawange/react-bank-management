import axios from "axios";

export const requestGetUsers = (payload) => {
  return axios.request({
    method: "get",
    url: "http://localhost:33001/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${payload}`,
    },
  });
};

export const requestCreateUser = (payload) => {
  return axios.request({
    method: "get",
    url: "http://localhost:33001/create-account",
    data: payload,
  });
};
