import CloseIcon from "@mui/icons-material/Close";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginUserFailure,
  loginUserInitiate,
  loginUserSuccess,
} from "../../redux/user/action";
import { addToLocalStorage } from "../../utils/setLocalStorage";
import { loginSchema } from "../../validation/login";

function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginSchema
      .validate({ email, password }, { abortEarly: true })
      .then((valid) => {
        console.log("valid", { ...valid });
        setError("");
        login();
      })
      .catch((err) => {
        setError(err?.message);
        setOpen(true);
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
        setError(err?.message);
        setOpen(true);
      });
  };
  console.log("state", user);
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <div className="flex justify-evenly items-center align-middle ">
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
            <Snackbar
              open={open}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              autoHideDuration={4000}
              onClose={handleClose}
              message={error}
              action={action}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
