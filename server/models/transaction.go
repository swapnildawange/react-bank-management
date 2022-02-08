package models

import "time"

type ListTransactionsResponse struct {
	ID         string    `db:"id" json:"id"`
	AccountId  string    `db:"account_id" json:"account_id"`
	Amount     int       `db:"amount" json:"amount"`
	Status     string    `db:"status" json:"status"`
	Type       string    `db:"type" json:"type"`
	Created_at time.Time `db:"created_at" json:"created_at"`
}
