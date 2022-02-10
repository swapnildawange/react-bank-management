import { Avatar } from "@mui/material";
import React from "react";
import { stringAvatar } from "../../utils/avtar";
import "./UserCard.css";

function UserCard({ user }) {
  const { first_name, last_name, balance, type } = user;

  return (
    <div className="card card-outer">
      <div className="card card-inner flex items-center justify-evenly">
        <Avatar
          {...stringAvatar(`${first_name} ${last_name}`)}
          className="mr-1"
        />
        <div className="self-start px-2 flex-1">
          <h1 className="text-lg font-bold pt-2 leading-none ">
            {first_name} {last_name}
          </h1>
          <h1 className="text-gray-600">{type}</h1>
        </div>
        <div>
          <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-yellow-600">
            {balance} &#8377;{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
