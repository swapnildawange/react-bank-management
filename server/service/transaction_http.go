package service

import (
	"encoding/json"
	"net/http"

	logger "github.com/sirupsen/logrus"
)

// get all transactions
func listTransactions(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		query := req.URL.Query()
		account_id := query.Get("account_id")
		transactions, err := deps.Store.ListTransactions(req.Context(), account_id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching transactions")
			rw.WriteHeader(http.StatusInternalServerError)
			rw.Write([]byte("Error fetching transaction details"))
			return
		}
		respBytes, err := json.Marshal(transactions)
		if len(transactions) == 0 {
			respBytes = []byte("No transaction found")
		}
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshalling transactions")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		rw.Header().Add("Content-Type", "application/json")
		rw.WriteHeader(http.StatusOK)
		rw.Write(respBytes)
	})
}
