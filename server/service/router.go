package service

import (
	"fmt"
	"go_bank_app/config"
	"net/http"

	"github.com/gorilla/mux"
)

const (
	versionHeader = "Accept"
)

/* The routing mechanism. Mux helps us define handler functions and the access methods */
func InitRouter(deps Dependencies) (router *mux.Router) {
	router = mux.NewRouter()
	v1 := fmt.Sprintf("application/vnd.%s.v1", config.AppName())
	router.HandleFunc("/ping", pingHandler).Methods("GET", "OPTIONS")

	// Version 1 API management

	router.HandleFunc("/transactions", isloggedin(listTransactions(deps), deps, "User")).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.HandleFunc("/account/update", isloggedin(updateAccountInfo(deps), deps, "Admin")).Methods(http.MethodPut).Headers(versionHeader, v1)

	router.HandleFunc("/deposit", isloggedin(DepositMoney(deps), deps, "User")).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.HandleFunc("/withdraw", isloggedin(WithdrawMoney(deps), deps, "User")).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.HandleFunc("/create-account", createUser(deps)).Methods("POST", "OPTIONS")
	// .Headers(versionHeader, v1)

	router.HandleFunc("/account", isloggedin(deleteAccount(deps), deps, "Admin")).Methods(http.MethodDelete).Headers(versionHeader, v1)

	router.HandleFunc("/login", loginUsersHandler(deps)).Methods(http.MethodPost).Headers(versionHeader, v1)
	return
}
