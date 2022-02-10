import axios from "axios";
export const getUserDetails = (userID) => {
  return axios
    .get("http://localhost:33001/user", {
      params: { id: userID },
    })
    .then((res) => res.data)
    .then((err) => err);
};
