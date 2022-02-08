package models

type Transaction struct {
	Id     string `db:"id" json:"id"`
	Amount int    `db:"amount" json:"amount"`
}
