import { Paper } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../API/getUsers";
import { addUserInfo } from "../../redux/user/action";

function Users() {
  const { isLoading, error, data: users } = useQuery("users", getUsers);

  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    const selectedUserInfo = users.find((user) => user.id === id);
    dispatch(addUserInfo(selectedUserInfo));
  };

  return (
    <div className="grid place-items-center">
      <h1 className="font-bold text-4xl">Users</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <>
        {users?.map((user) => (
          <div className="cursor-pointer" key={user.id}>
            <Link to={`/users/${user.id}`}>
              <Paper
                elevation={3}
                className="w-fit p-5 h-40 my-5 flex justify-evenly items-center flex-col "
              >
                <h1 className="text-3xl text-gray-800">{user.name}</h1>
                <h2>{user.email}</h2>
              </Paper>
            </Link>
          </div>
        ))}
      </>
    </div>
  );
}

export default Users;
