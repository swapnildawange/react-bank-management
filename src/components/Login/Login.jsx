import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomSnackBar from "../../components/CustomSnackBar/CustomSnackBar";
import {
  loginUserFailure,
  loginUserInitiate,
  loginUserSuccess
} from "../../redux/user/action";
import { addToLocalStorage } from "../../utils/setLocalStorage";
import { loginSchema } from "../../validation/login";
function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open,setOpen] = useState(false);
  const [error, setError] = useState({
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    loginSchema
      .validate({ email, password }, { abortEarly: true })
      .then((valid) => {
        console.log("valid", { ...valid });
        setOpen(false)
        login();
      })
      .catch((err) => {
        setOpen(true)
        setError({  severity: "warning", message: err?.message });
      });
  };

  const login = () => {
    dispatch(loginUserInitiate());
    axios
      .post("http://localhost:33001/login", { email, password })
      .then((res) => {
        console.log("res", res.data);
        dispatch(loginUserSuccess(res.data));
        navigate("/");
        addToLocalStorage("user", res.data);
      })
      .catch((err) => {
        console.log("err", { ...err });
        dispatch(loginUserFailure(err?.message ?? "Try after some time"));
         setOpen(true);
        setError({  severity: "error", message: err?.message });
      });
  };

  return (
    <div className="flex justify-evenly mt-10 items-center">
      <div className="flex justify-evenly items-center  ">
        <img
          src="images/signup.svg"
          alt="signup"
          className="hidden  lg:block max-w-lg "
        />
        <div className="signup-con max-w-2xl ">
          <h1 className="signup-title text-3xl md:text-5xl my-4 md:mb-8 md:mt-6  ">
            Login
          </h1>

          <div className="signup-input ">
            {/* email */}
            <TextField
              required
              fullWidth
              className="signup-input"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={error.errorInput === "email"}
            />
            {/* password */}
            <TextField
              required
              className="signup-input"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={error.errorInput === "password"}
            />

            {/* login button */}

            <Button
              size="large"
              className="signup-btn"
              fullWidth
              variant="contained"
              color="success"
              onClick={(e) => handleSubmit(e)}
              disabled={user.isLoading}
            >
              {user.isLoading ? <CircularProgress /> : "Login"}
            </Button>
            <p>
              New user{" "}
              <Link to="/" className="font-bold text-blue-600">
                Create account
              </Link>
            </p>
            <CustomSnackBar {...error} open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
