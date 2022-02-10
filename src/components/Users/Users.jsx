import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../API/getUsers";
import UserCard from "./UserCard";

function Users() {
  const { userInfo } = useSelector((state) => state.user);
  const {
    isLoading,
    error,
    data: users,
  } = useQuery("users", () => getUsers(userInfo.token));

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
    </div>
  );
}

export default Users;
