import { Button, Paper } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "../../API/getUserDetails";

function UserDetails() {
  const { userID } = useParams();

  const {
    isLoading,
    error,
    data: userInfo,
  } = useQuery("user", async () => getUserDetails(userID));
  return (
    <div>
      {" "}
      <div>
        <Paper
          elevation={3}
          className="w-fit p-10 h-fit my-5 flex justify-evenly items-center flex-col "
        >
          <h1 className="text-3xl text-gray-800">
            {userInfo?.first_name} {userInfo?.last_name}
          </h1>

          <h2>Email : {userInfo?.email}</h2>
          <Link to="/users">GO back</Link>
        </Paper>
      </div>
    </div>
  );
}

export default UserDetails;
