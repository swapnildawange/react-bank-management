package models

type TransactionData struct {
	Id     string `db:"id" json:"id"`
	Amount int    `db:"amount" json:"amount"`
	Type   string `db:"type" json:"type"`
	Status string `db:"status" json:"status"`
}
