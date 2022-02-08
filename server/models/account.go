package models

import (
	"time"
)

type Account struct {
	Id         string    `db:"id" json:"id"`
	User_id    string    `db:"user_id" json:"user_id"`
	Balance    int       `db:"balance" json:"balance"`
	Type       string    `db:"type" json:"type"`
	Created_at time.Time `db:"created_at" json:"created_at"`
	Updated_at time.Time `db:"updated_at" json:"updated_at"`
}

type CreateAccountRequest struct{}
type CreateAccountResponse struct {
	Id string `db:"id" json:"id"`
}

type UpdateAccountRequest struct {
	ID          string `json:"id"`
	AccountType string `json:"type"`
}

type UpdateAccountResponse struct {
	ID          string    `db:"id" json:"id"`
	AccountType string    `db:"type" json:"type"`
	Updated_at  time.Time `db:"updated_at" json:"updated_at"`
}
