import { Button, FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Deposit() {
  const [amount, setAmount] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  console.log("user.token", userInfo);
  const handleWithdraw = () => {
    // dispatch(loginuserInfoInitiate());

    axios
      .post(
        "http://localhost:33001/deposit",
        {
          id: userInfo.acc_id,
          amount: parseInt(amount),
        },
        {
          headers: {
            Authorization: `${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        // dispatch(loginUserSuccess(res.data));
        // navigate("/");
        // addToLocalStorage("user", res.data);
      })
      .catch((err) => {
        console.log("err", { ...err });
        // dispatch(loginUserFailure(err?.message ?? "Try after some time"));
        // setError(err?.message);
        // setOpen(true);
      });
  };
  return (
    <div className="px-8">
      <div className=" flex flex-col justify-center">
        <h1 className="font-bold text-4xl text-gray-500 my-4 mb-10 self-start">
          Deposit
        </h1>
        <FormControl>
          <TextField
            required
            className="signup-input"
            label="Amount "
            type="number"
            fullWidth
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            // error={error.errorInput === "password"}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleWithdraw}
        >
          continue
        </Button>
      </div>
    </div>
  );
}

export default Deposit;
