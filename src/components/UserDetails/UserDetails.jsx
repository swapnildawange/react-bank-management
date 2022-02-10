import { Avatar } from "@mui/material";
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../API/getUserDetails";
import { stringAvatar } from "../../utils/avtar";
function UserDetails({ id }) {
  const { userID } = useParams();

  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: userInfo,
  } = useQuery(userID || id, async () => getUserDetails(id));

  console.log("id", id, isLoading, error, userInfo);
  return (
    <div className="grid place-items-center">
      <div className="card card-outer">
        <div className="card card-inner flex flex-col items-center justify-evenly">
          <Avatar
            {...stringAvatar(`${userInfo?.first_name} ${userInfo?.last_name}`, {
              width: 100,
              height: 100,
              fontSize: "1.5rem",
            })}
            className="mr-1"
          />
          {/* <div className="self-start px-2 flex-1"> */}
          <h1 className="text-2xl font-bold pt-4 pb-2 leading-none ">
            {userInfo?.first_name} {userInfo?.last_name}
          </h1>
          <div className="flex flex-col  gap-3 my-2">
            <div className="flex gap-3 justify-between">
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-blue-600">
                Account type
              </h1>
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-yellow-600">
                {userInfo?.type}
              </h1>
            </div>
            <div className="flex gap-3 justify-between">
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-blue-600">
                Balance
              </h1>
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-yellow-600">
                {userInfo?.balance} &#8377;
              </h1>
            </div>
            <div className="flex gap-3 justify-between">
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-blue-600">
                Email
              </h1>
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-yellow-600">
                {userInfo?.email}
              </h1>
            </div>
            <div className="flex gap-3 justify-between">
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-blue-600">
                Date of birth
              </h1>
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-yellow-600">
                {moment(userInfo?.date_of_birth).format("DD/MM/yyyy")}
              </h1>
            </div>
            <div className="flex gap-3 justify-between">
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-blue-600">
                Created at
              </h1>
              <h1 className="card-chip py-1 px-4 rounded-full w-fit h-fit bg-pink-100 text-yellow-600">
                {moment(userInfo?.created_at).format("DD/MM/yyyy")}
              </h1>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
