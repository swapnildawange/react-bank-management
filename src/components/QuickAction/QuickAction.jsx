import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React from "react";
import { useNavigate } from "react-router-dom";
import ActionIcon from "./ActionIcon";
function QuickAction() {
  const navigate = useNavigate();
  return (
    <div className="max-w-60 flex flex-col  max-h-screen px-8 ">
  
      <h1 className="signup-title text-3xl my-4 md:text-5xl md:mb-8 md:mt-4 ">
        Quick Action
      </h1>
      <div className="grid gap-4 grid-cols-2 grid-rows-2 place-items-center mt-4 ">
        <div
          className="grid place-items-center"
          onClick={() => navigate("/withdraw")}
        >
          <ActionIcon children={<RemoveCircleOutlineIcon fontSize="large" />} />
          <h1 className="text-lg font-semibold mt-2 text-gray-500">Withdraw</h1>
        </div>
        <div
          className="grid place-items-center "
          onClick={() => navigate("/deposit")}
        >
          <ActionIcon
            children={<AddCircleOutlineOutlinedIcon fontSize="large" />}
          />
          <h1 className="text-lg font-semibold mt-2 text-gray-500">Deposit</h1>
        </div>
        <div
          className="grid place-items-center "
          onClick={() => navigate("/details")}
        >
          <ActionIcon children={<InfoIcon fontSize="large" />} />
          <h1 className="text-lg font-semibold mt-2 text-gray-500">Details</h1>
        </div>
        <div
          className="grid place-items-center "
          onClick={() => navigate("/history")}
        >
          <ActionIcon children={<HistoryIcon fontSize="large" />} />
          <h1 className="text-lg font-semibold mt-2 text-gray-500 ">History</h1>
        </div>
      </div>
    </div>
  );
}

export default QuickAction;
