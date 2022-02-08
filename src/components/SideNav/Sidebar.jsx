import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Avatar } from "@mui/material";
import React from "react";
function Sidebar() {
  const active = 1;
  return (
    <div className="max-w-60 flex flex-col  border-2 border-red-500 max-h-screen h-screen ">
      <div className="self-center mb-10">
        <Avatar sx={{ width: 100, height: 100 }} className="my-4"></Avatar>
        <h1 className="text-2xl font-bold my-2">hi,Nichole</h1>
      </div>
      <div>
        <div
          className={`flex justify-start hover:bg-gray-800 hover:text-white max-w-xs w-40 p-3.5 rounded-xl m-3 cursor-pointer transition ease-in-out ${
            active === 1 && "bg-gray-800 text-white"
          } `}
        >
          <DashboardIcon />
          <h1 className="px-2.5">Dashboard</h1>
        </div>
        <div className="flex justify-start hover:bg-gray-800 hover:text-white max-w-xs w-40 p-3.5 rounded-xl m-3 cursor-pointer transition ease-in-out ">
          <CreditCardIcon />
          <h1 className="px-2.5">Payment</h1>
        </div>
        <div className="flex justify-start hover:bg-gray-800 hover:text-white max-w-xs w-40 p-3.5 rounded-xl m-3 cursor-pointer transition ease-in-out ">
          <ReceiptIcon />
          <h1 className="px-2.5">Transactions</h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
