import axios from "axios";
export const getUsers = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get("http://localhost:33001/users", config)
    .then((res) => res.data)
    .then((err) => err);
};
