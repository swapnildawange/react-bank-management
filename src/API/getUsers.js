import axios from "axios";
export const getUsers = async () => {
  return axios
    .get("https://reqres.in/api/users ")
    .then((res) => res.data.data)
    .then((err) => err);
};
