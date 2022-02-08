package service

import (
	"encoding/json"
	"fmt"
	"go_bank_app/models"
	"net/http"

	logger "github.com/sirupsen/logrus"
)

func DepositMoney(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		var transactionId string
		var trans models.Transaction
		err := json.NewDecoder(req.Body).Decode(&trans)
		if err != nil {
			http.Error(rw, err.Error(), http.StatusBadRequest)
			return
		}

		transactionId, err = deps.Store.Deposit(req.Context(), trans)
		if err != nil && err.Error() == "invalid id error" {
			logger.WithField("err", err.Error()).Error("Bad Input")
			rw.Write([]byte("Bad Input .No such Id"))
			rw.WriteHeader(http.StatusBadRequest)
			return
		}
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching or storing data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		output := fmt.Sprintf("Amount updated for user Your Transaction Id is %s", transactionId)
		respBytes, err := json.Marshal(output)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling output data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		rw.WriteHeader(http.StatusOK)
		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

func WithdrawMoney(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		var trans models.Transaction
		var transactionId string
		err := json.NewDecoder(req.Body).Decode(&trans)
		if err != nil {
			http.Error(rw, err.Error(), http.StatusBadRequest)
			return
		}
		transactionId, err = deps.Store.Withdraw(req.Context(), trans)
		if err != nil && err.Error() == "invalid id error" {
			logger.WithField("err", err.Error()).Error("Bad Input")
			rw.Write([]byte("Bad Input .No such Id"))
			rw.WriteHeader(http.StatusBadRequest)
			return
		}
		if err != nil && err.Error() == "insufficient funds" {
			logger.WithField("err", err.Error()).Error("Bad Input")
			rw.Write([]byte("Bad Input .Not Enough MOney"))
			rw.WriteHeader(http.StatusBadRequest)
			return
		}
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching or storing data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		output := fmt.Sprintf("Amount updated for user Your Transaction Id is %v", transactionId)
		respBytes, err := json.Marshal(output)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling output data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		rw.WriteHeader(http.StatusOK)
		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)

	})
}
