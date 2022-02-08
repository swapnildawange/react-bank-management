package service

import (
	"encoding/json"
	"go_bank_app/models"
	"net/http"

	logger "github.com/sirupsen/logrus"
)


// update Customer Bank Account Info API
func updateAccountInfo(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		var accountInfo models.UpdateAccountRequest
		err := json.NewDecoder(req.Body).Decode(&accountInfo)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write([]byte("Invalid account request"))
			return
		}

		resAccountInfo, err := deps.Store.UpdateAccountInfo(req.Context(), accountInfo)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error updating account info")
			rw.WriteHeader(http.StatusInternalServerError)
			rw.Write([]byte("Error updating account info"))
			return
		}

		respBytes, err := json.Marshal(resAccountInfo)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshalling account info")
			rw.WriteHeader(http.StatusInternalServerError)
			rw.Write([]byte("Error updating account info"))
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.WriteHeader(http.StatusOK)
		rw.Write(respBytes)
	})
}
func deleteAccount(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		var incoming models.DeleteUserRequest
		json.NewDecoder(req.Body).Decode(&incoming)
		err := deps.Store.DeleteAccount(req.Context(), incoming.Id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(incoming)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling users data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}
