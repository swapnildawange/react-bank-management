import axios from "axios";
export const login = async ({ email, password }) => {
  axios
    .post("http://localhost:33001/login", { email, password })
    .then((res) => {
      return res.data;
      //   addToLocalStorage("user", res.data);
    })
    .catch((err) => {
      return err;
      //   dispatch(loginUserFailure(err?.message ?? "Try after some time"));
      //   setOpen(true);
      //   setError({ severity: "error", message: err?.message });
    });
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${token}`,
  //     },
  //   };
  //   return axios
  //     .get("http://localhost:33001/users", config)
  //     .then((res) => res.data)
  //     .then((err) => err);
};
