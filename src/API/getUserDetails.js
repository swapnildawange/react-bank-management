import axios from "axios";
export const getUserDetails = async (userID) => {
  return axios
    .get(`https://reqres.in/api/users/${userID}`)
    .then((res) => res.data.data)
    .then((err) => err);
};
