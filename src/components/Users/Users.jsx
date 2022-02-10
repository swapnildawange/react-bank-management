import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../API/getUsers";
import UserCard from "./UserCard";

function Users() {
  const { isLoading, error, data: users } = useQuery("users", getUsers);

  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    const selectedUserInfo = users.find((user) => user.id === id);
  };

  console.log("users", users);
  return (
    <div
      className="grid place-items-center  "
    >
      <h1 className="font-bold text-4xl text-gray-500 mt-4">Users</h1>
      <>
        {users?.map((user) => (
          <div className="cursor-pointer" key={user.id}>
            <Link to={`/users/${user.id}`}>
              <UserCard {...{ user }} />
            </Link>
          </div>
        ))}
      </>
    </div>
  );
}

export default Users;
