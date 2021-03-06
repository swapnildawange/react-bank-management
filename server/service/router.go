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

	router.HandleFunc("/transactions", corsHandler(listTransactions(deps))).Methods("GET", "OPTIONS")

	router.HandleFunc("/account/update", corsHandler(isloggedin(updateAccountInfo(deps), deps, "Admin"))).Methods(http.MethodPut).Headers(versionHeader, v1)

	router.HandleFunc("/deposit", corsHandler(isloggedin(DepositMoney(deps), deps, "User"))).Methods("POST", "OPTIONS")

	router.HandleFunc("/withdraw", corsHandler(isloggedin(WithdrawMoney(deps), deps, "User"))).Methods("POST", "OPTIONS")
	router.HandleFunc("/create-account", corsHandler(createUser(deps))).Methods("POST", "OPTIONS")

	router.HandleFunc("/account", corsHandler(isloggedin(deleteAccount(deps), deps, "Admin"))).Methods(http.MethodDelete).Headers(versionHeader, v1)
	router.HandleFunc("/users", corsHandler(isloggedin(getUsers(deps), deps, "Admin"))).Methods("GET", "OPTIONS")
	router.HandleFunc("/user", corsHandler(getUserDetails(deps))).Methods("GET", "OPTIONS")
	router.HandleFunc("/login", corsHandler(loginUserHandler(deps))).Methods("POST", "OPTIONS")
	return
}
