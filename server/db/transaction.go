package db

import (
	"context"
	"errors"
	"fmt"

	"go_bank_app/models"

	logger "github.com/sirupsen/logrus"
)

func (s *pgStore) ListTransactions(ctx context.Context, account_id string) (transactions []models.ListTransactionsResponse, err error) {
	err = s.db.Select(&transactions, listTransaction, account_id)
	fmt.Println(transactions)
	if err != nil {
		return
	}
	return
}

func (s *pgStore) Deposit(ctx context.Context, trans models.Transaction) (transId string, err error) {
	var count int

	dbTransaction, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating transaction")
		return
	}

	var history models.TransactionData
	history.Amount = trans.Amount
	history.Id = trans.Id
	history.Type = "credit"
	row := dbTransaction.QueryRow(checkStatement, trans.Id)
	err = row.Scan(&count)
	if count == 0 || err != nil {

		dbTransaction.Rollback()
		err = errors.New("invalid id error")
		return
	}
	_, err = dbTransaction.Exec(updateStatementDebit, trans.Id, trans.Amount)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error updating database table accounts")
		history.Status = "failure"
		_, err = s.storeTransaction(ctx, history, dbTransaction)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error updating database table transaction")
			dbTransaction.Rollback()
			return
		}
		dbTransaction.Rollback()
		return
	}
	history.Status = "success"
	transId, err = s.storeTransaction(ctx, history, dbTransaction)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error updating database")
		dbTransaction.Rollback()
		return
	}
	err = dbTransaction.Commit()
	return
}

func (s *pgStore) Withdraw(ctx context.Context, trans models.Transaction) (transId string, err error) {
	var count int
	var amount int
	
	dbTransaction, err := s.db.BeginTx(ctx, nil)
	fmt.Println(trans)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating transaction")
		return
	}
	row1 := dbTransaction.QueryRow(checkStatement, trans.Id)
	err = row1.Scan(&count)
	if count == 0 || err != nil {
		dbTransaction.Rollback()
		err = errors.New("invalid id error")
		return
	}
	row := dbTransaction.QueryRow(selectStatement, trans.Id)
	err = row.Scan(&amount)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error quering database")
		dbTransaction.Rollback()
		return
	}
	if trans.Amount > amount {
		err = errors.New("insufficient funds")
		dbTransaction.Rollback()
		return
	}
	amount = amount - trans.Amount

	var history models.TransactionData
	history.Amount = trans.Amount
	history.Id = trans.Id
	history.Type = "debit"

	_, err = s.db.Exec(updateStatementCredit, trans.Id, amount)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error updating database")
		dbTransaction.Rollback()
		history.Status = "failure"
		_, err = s.storeTransaction(ctx, history, dbTransaction)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error updating database table transaction")
			dbTransaction.Rollback()
			return
		}
		dbTransaction.Rollback()
		return

	}

	history.Status = "success"
	transId, err = s.storeTransaction(ctx, history, dbTransaction)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error updating database")
		dbTransaction.Rollback()
		return
	}
	err = dbTransaction.Commit()
	return

}
