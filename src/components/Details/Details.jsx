import React from "react";
import { useSelector } from "react-redux";
import UserDetails from "../UserDetails/UserDetails";

function Details() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <UserDetails id={userInfo.id} />
    </div>
  );
}

export default Details;
