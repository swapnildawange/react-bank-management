import axios from "axios";
export const getUsers = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  };
  return axios
    .get("http://localhost:33001/users", config)
    .then((res) => res.data)
    .then((err) => err);
};
