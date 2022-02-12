import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUserInitiate } from "../../redux/user/action";
import { signUpSchema } from "../../validation/signUp";
import CustomSnackBar from "../CustomSnackBar/CustomSnackBar";
import "./SignUp.css";
function SignUp() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    message: "",
    severity: "",
    errorInput: "",
  });

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Female",
    accountType: "Saving",
    day: parseInt(moment().format("DD")),
    month: parseInt(moment().format("MM")),
    year: parseInt(moment().format("yyyy")),
    email: "",
    password: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpSchema
      .validate(userInfo, { abortEarly: true })
      .then((valid) => {
        setOpen(false);
        setError({
          errorInput: "",
          message: "",
        });

        // create user account
        createUserAccount(userInfo);
        navigate("/");
      })
      .catch((err) => {
        setOpen(true);

        setError({
          severity: "warning",
          errorInput: err.path,
          message: err.message,
        });
      });
  };

  useEffect(() => {
    if (user?.isAuthenticated && !user?.isLoggedIn) {
      navigate("/");
    }
    if (user?.error) {
      setOpen(true);
      setError({ severity: "error", message: user?.error });
    }
  }, [user]);

  const createUserAccount = (userInfo) => {
    dispatch(
      createUserInitiate({
        ...userInfo,
        ...{
          day: parseInt(userInfo.day),
          month: parseInt(userInfo.month),
          year: parseInt(userInfo.year),
        },
      })
    );
  };

  return (
    <Paper elevation={3}>
      <div className="flex justify-evenly items-center align-middle  min-h-screen">
        <img
          src="images/signup.svg"
          alt="signup"
          className="hidden  lg:block max-w-lg "
        />
        <div className="signup-con max-w-2xl ">
          <h1 className="signup-title text-3xl my-4 md:text-5xl md:mb-8 md:mt-4 ">
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
              error={error.errorInput === "month"}
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
            color="primary"
            onClick={(e) => handleSubmit(e)}
            disabled={user.isLoading}
          >
            {user.isLoading ? <CircularProgress /> : "Sign Up"}
          </Button>
          <p>
            Already a user{" "}
            <Link to="/" className="font-bold text-blue-600">
              Login
            </Link>
          </p>
          <CustomSnackBar {...error} open={open} setOpen={setOpen} />
        </div>
      </div>
    </Paper>
  );
}

export default SignUp;
