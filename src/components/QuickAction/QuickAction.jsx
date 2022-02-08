import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import ActionIcon from "./ActionIcon";
function QuickAction() {
  return (
    <div className="max-w-60 flex flex-col  max-h-screen px-8 ">
      <h1 className="text-4xl font-bold  my-4 text-gray-600">Quick action</h1>
      <div className="grid gap-4 grid-cols-2 grid-rows-2 place-items-center ">
        <div className="grid place-items-center">
          <ActionIcon
            children={<AddCircleOutlineOutlinedIcon fontSize="large" />}
          />
          <h1 className="text-lg font-semibold mt-2 text-gray-500">Top Up</h1>
        </div>
        <div className="grid place-items-center ">
          <ActionIcon children={<AttachMoneyIcon fontSize="large" />} />
          <h1 className="text-lg font-semibold mt-2 text-gray-500">Pay</h1>
        </div>
        <div className="grid place-items-center ">
          <ActionIcon children={<SendIcon fontSize="large" />} />
          <h1 className="text-lg font-semibold mt-2 text-gray-500">Send</h1>
        </div>
        <div className="grid place-items-center ">
          <ActionIcon children={<CallReceivedIcon fontSize="large" />} />
          <h1 className="text-lg font-semibold mt-2 text-gray-500">Request</h1>
        </div>
      </div>
    </div>
  );
}

export default QuickAction;
