import moment from "moment";
import React from "react";

function HistoryCard({ status, type, created_at, amount }) {
  return (
    <div>
      <div
        className={`card card-outer  ${
          status === "success" ? "bg-green-700" : "bg-red-600"
        }`}
      >
        <div className=" card card-inner  ">
          <div className="flex justify-evenly align-middle items-center gap-4">
            {/* <Avatar
            sx={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              padding: "0 10px",
              borderRadius: 40,
              width: "fit-content",
              height: 50,
              minWidth: 50,
              background: type === "withdraw" ? "green" : "red",
            }}
          >
            1000<span className="text-sm">&#8377;</span>
          </Avatar> */}
            <div className="flex-1">
              <h1 className="text-xl font-bold pt-2 leading-none capitalize ">
                {type}
              </h1>
              <p className="mt-1 text-gray-700">
                {moment(created_at).format("MMMM Do YYYY")}
              </p>
            </div>
            <h1
              className={`card-chip py-1 px-4 rounded-full w-fit text-white h-fit  ${
                type === "credit" ? "bg-green-900" : "bg-red-600"
              }`}
            >
              {amount}
              <span className="text-sm">&#8377;</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
