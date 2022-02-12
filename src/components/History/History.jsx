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

  return (
    <div className="grid place-items-center">
      {!error && !isLoading && !transactions ? (
        <h1 className="signup-title text-3xl my-4 md:text-5xl md:mb-8 md:mt-4 ">
          No transactions
        </h1>
      ) : (
        <>
          {transactions?.map((transaction) => (
            <HistoryCard key={transaction.id} {...transaction} />
          ))}
        </>
      )}
    </div>
  );
}

export default History;
