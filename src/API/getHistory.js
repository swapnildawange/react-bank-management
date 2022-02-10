import axios from "axios";
export const getHistory = (id) => {
  return axios
    .get("http://localhost:33001/transactions", { params: { id } })
    .then((res) => res.data)
    .then((err) => err);
};
