import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsersInitiate } from "../../redux/users/action";
import CustomSnackBar from "../CustomSnackBar/CustomSnackBar";
import UserCard from "./UserCard";

function Users() {
  const { userInfo } = useSelector((state) => state.user);
  const { users, error: err } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [error, setError] = useState({
    message: "",
    severity: "",
  });
  const [open, setOpen] = useState();

  useEffect(() => {
    dispatch(getUsersInitiate(userInfo.token));
    if (err) {
      setOpen(true);
      setError({ severity: "error", message: err });
    }
  }, [userInfo, err, dispatch]);

  
  return (
    <div className="grid place-items-center  ">
      <h1 className="signup-title  text-4xl my-4 md:text-5xl md:mb-8 md:mt-4 ">
        Users
      </h1>
      {users?.map((user) => (
        <div className="cursor-pointer" key={user.id}>
          <Link to={`/users/${user.id}`}>
            <UserCard {...{ user }} />
          </Link>
        </div>
      ))}
      <CustomSnackBar
        open={open}
        severity={error?.severity}
        message={error?.message}
        setOpen={setOpen}
      />
    </div>
  );
}

export default Users;
