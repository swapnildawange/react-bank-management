import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserFailure,
  createUserInitiate,
  createUserSuccess,
} from "../../redux/user/action";
import { signUpSchema } from "../../validation/signUp";
import "./SignUp.css";

function SignUp() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Female",
    accountType: "Saving",
    day: parseInt(moment().format("DD")),
    month: parseInt(moment().format("MM")),
    year: parseInt(moment().format("YYYY")),
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    errorInput: "",
    errorMessage: "",
  });
  const {
    firstName,
    middleName,
    lastName,
    gender,
    accountType,
    day,
    month,
    year,
    email,
    password,
  } = userInfo;

  const [open, setOpen] = useState(false);
  const handleChange = () => {};
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    signUpSchema
      .validate(userInfo, { abortEarly: true })
      .then((valid) => {
        console.log("valid", { ...valid });
        setError({
          errorInput: "",
          errorMessage: "",
        });

        // create user account
        createUserAccount(userInfo);
      })
      .catch((err) => {
        console.log("err", { ...err });
        setError({
          errorInput: err.path,
          errorMessage: err.message,
        });
        setOpen(true);
      });
  };

  const createUserAccount = (userInfo) => {
    dispatch(createUserInitiate());
    axios
      .post("http://localhost:33001/create-account", userInfo)
      .then((res) => {
        dispatch(createUserSuccess({ ...res.data, ...userInfo }));
      })
      .catch((err) => {
        console.log("err", { ...err });
        dispatch(createUserFailure(err));
        setError({
          errorMessage: err?.message,
        });
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
    <div className="flex justify-evenly items-center align-middle  min-h-screen">
      <img
        src="images/signup.svg"
        alt="signup"
        className="hidden  lg:block max-w-lg "
      />
      <div className="signup-con max-w-2xl ">
        <h1 className="signup-title text-3xl md:text-5xl md:mb-8 md:mt-4  mb-2">
          Create your account
        </h1>
        {/* first name */}
        <TextField
          required
          className="signup-input"
          label="First Name"
          type="string"
          fullWidth
          value={firstName}
          onChange={(event) =>
            setUserInfo((pre) => ({
              ...pre,
              firstName: event.target.value,
            }))
          }
          error={error.errorInput === "firstName"}
        />
        <TextField
          required
          className="signup-input"
          label="Middle Name"
          type="string"
          fullWidth
          value={middleName}
          onChange={(event) =>
            setUserInfo((pre) => ({
              ...pre,
              middleName: event.target.value,
            }))
          }
          error={error.errorInput === "middleName"}
        />
        {/* last name */}
        <TextField
          required
          fullWidth
          className="signup-input"
          label="Last Name"
          type="string"
          value={lastName}
          onChange={(event) =>
            setUserInfo((pre) => ({
              ...pre,
              lastName: event.target.value,
            }))
          }
          error={error.errorInput === "lastName"}
        />
        <FormLabel className="text-left">Gender</FormLabel>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Female"
          name="radio-buttons-group"
          row
          className="signup-input"
          value={gender}
        >
          <FormControlLabel
            value="Female"
            control={<Radio />}
            label="Female"
            onChange={(event) =>
              setUserInfo((pre) => ({
                ...pre,
                gender: event.target.value,
              }))
            }
          />
          <FormControlLabel
            value="Male"
            control={<Radio />}
            label="Male"
            onChange={(event) =>
              setUserInfo((pre) => ({
                ...pre,
                gender: event.target.value,
              }))
            }
          />
          <FormControlLabel
            value="Other"
            control={<Radio />}
            label="Other"
            onChange={(event) =>
              setUserInfo((pre) => ({
                ...pre,
                gender: event.target.value,
              }))
            }
          />
        </RadioGroup>
        <FormLabel className="text-left">Account Type</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Saving"
          name="radio-buttons-group"
          row
          className="signup-input"
          value={accountType}
        >
          <FormControlLabel
            value="Saving"
            control={<Radio />}
            label="Saving"
            onChange={(event) =>
              setUserInfo((pre) => ({
                ...pre,
                accountType: event.target.value,
              }))
            }
          />
          <FormControlLabel
            value="Current"
            control={<Radio />}
            label="Current"
            onChange={(event) =>
              setUserInfo((pre) => ({
                ...pre,
                accountType: event.target.value,
              }))
            }
          />
        </RadioGroup>
        <div className="signup-input signup-date-con">
          {/* date of birth */}
          <TextField
            required
            label="Day"
            type="number"
            value={day}
            onChange={(event) =>
              setUserInfo((pre) => ({
                ...pre,
                day: event.target.value,
              }))
            }
            error={error.errorInput === "day"}
          />
          <TextField
            required
            label="Month"
            type="number"
            value={month}
            onChange={(event) =>
              setUserInfo((pre) => ({
                ...pre,
                month: event.target.value,
              }))
            }
            error={error.errorInput === "month"}
          />
          <TextField
            required
            label="Year"
            type="number"
            value={year}
            onChange={(event) =>
              setUserInfo((pre) => ({
                ...pre,
                year: event.target.value,
              }))
            }
            error={error.errorInput === "year"}
          />
        </div>
        {/* email */}
        <TextField
          required
          fullWidth
          className="signup-input"
          label="Email"
          type="email"
          value={email}
          onChange={(event) =>
            setUserInfo((pre) => ({
              ...pre,
              email: event.target.value,
            }))
          }
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
          onChange={(event) =>
            setUserInfo((pre) => ({
              ...pre,
              password: event.target.value,
            }))
          }
          error={error.errorInput === "password"}
        />

        {/* sign up button */}

        <Button
          size="large"
          className="signup-btn"
          fullWidth
          variant="contained"
          color="success"
          onClick={(e) => handleSubmit(e)}
          disabled={user.isLoading}
        >
          {user.isLoading ? <CircularProgress /> : "Submit"}
        </Button>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={4000}
          onClose={handleClose}
          message={error.errorMessage}
          action={action}
        />
      </div>
    </div>
  );
}

export default SignUp;
