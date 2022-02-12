import { Button, FormControl, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { amountSchema } from "../../validation/amount";
import CustomSnackBar from "../CustomSnackBar/CustomSnackBar";

function Withdraw() {
  const [amount, setAmount] = useState(0);
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    message: "",
    severity: "",
  });
  const handleWithdraw = () => {
    amountSchema
      .validate({ amount }, { abortEarly: true })
      .then((valid) => {
        setOpen(false);
        axios
          .post(
            "http://localhost:33001/withdraw",
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
            setOpen(true);
            setError({
              severity: "success",
              message: `Your account is debited by ${amount} Rs.`,
            });
          })
          .catch((err) => {
            setOpen(true);
            setError({
              message: err,
              severity: "error",
            });
          });
      })
      .catch((err) => {
        setOpen(true);
        setError({ severity: "warning", message: err?.message });
      });
  };

  return (
    <div className="px-8 ">
      <div className=" flex flex-col justify-center max-w-md  my-0 mx-auto self-center">
        <h1 className="signup-title  text-4xl my-4 md:text-5xl md:mb-8 md:mt-4 ">
          Withdraw
        </h1>
        <FormControl>
          <TextField
            required
            className="signup-input"
            label="Amount "
            type="number"
            value={amount}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(event) => setAmount(event.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleWithdraw}
          title="withdraw"
        >
          continue
        </Button>
        <CustomSnackBar {...error} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Withdraw;
