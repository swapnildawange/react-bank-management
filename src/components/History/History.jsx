import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getHistory } from "../../API/getHistory";
import HistoryCard from "./HistoryCard";

function History() {
  const { userInfo } = useSelector((state) => state.user);
  const {
    isLoading,
    error,
    data: transactions,
  } = useQuery("history", () => getHistory(userInfo.acc_id));
  console.log("userID", userInfo.acc_id, isLoading, error, transactions);

  return (
    <div className="grid place-items-center">
      {!error &&
        !isLoading &&
        transactions?.map((transaction) => (
          <HistoryCard key={transaction.id} {...transaction} />
        ))}
    </div>
  );
}

export default History;
