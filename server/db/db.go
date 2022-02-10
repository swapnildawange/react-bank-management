package db

import (
	"context"
	"go_bank_app/models"
)

type Storer interface {
	// update user account info
	UpdateAccountInfo(context.Context, models.UpdateAccountRequest) (models.UpdateAccountResponse, error)
	// ListTransactions returns all transactions
	ListTransactions(context.Context, string) ([]models.ListTransactionsResponse, error)
	Deposit(context.Context, models.Transaction) (string, error)
	Withdraw(context.Context, models.Transaction) (string, error)
	CreateUser(context.Context, models.CreateUserRequest) (models.User, error)
	CreateAccount(context.Context, models.CreateUserRequest, string) (models.CreateAccountResponse, error)
	DeleteAccount(context.Context, string) error
	GetUser(context.Context, string) (models.GetUserResponse, error)
	GetUsers(context.Context) ([]models.GetUsersResponse, error)
	GetUserDetails(context.Context, string) (models.GetUserResponse, error)
}
