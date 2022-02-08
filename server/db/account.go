package db

import (
	"context"
	"go_bank_app/models"
	"time"

	"github.com/google/uuid"
	logger "github.com/sirupsen/logrus"
)

func (s *pgStore) UpdateAccountInfo(ctx context.Context, reqAccountInfo models.UpdateAccountRequest) (resAccountInfo models.UpdateAccountResponse, err error) {

	err = s.db.GetContext(ctx, &resAccountInfo, updateAccountinfo, reqAccountInfo.AccountType, time.Now(), reqAccountInfo.ID)
	if err != nil {

		return
	}
	return
}

func (s *pgStore) CreateAccount(ctx context.Context, req models.CreateUserRequest, user_id string) (res models.CreateAccountResponse, err error) {
	var acc models.Account
	acc.Id = uuid.NewString()
	acc.User_id = user_id
	acc.Balance = 0
	acc.Type = req.Type
	acc.Created_at = time.Now()
	acc.Updated_at = time.Now()

	err = s.db.GetContext(ctx, &res, createAccount, acc.Id, acc.User_id, acc.Balance, acc.Type, acc.Created_at, acc.Updated_at)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating account")
		return
	}

	return
}

func (s *pgStore) DeleteAccount(ctx context.Context, acc_id string) (err error) {
	dbTransaction, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating transaction")
		return
	}
	var user_id string
	sqlStatement := `SELECT user_id FROM accounts WHERE id = $1` //acc_id
	row := dbTransaction.QueryRow(sqlStatement, acc_id)
	err = row.Scan(&user_id)
	if err != nil {
		dbTransaction.Rollback()
		logger.WithField("err", err.Error()).Error("Invalid account id")
		return
	}
	var count int
	sqlStatement = `SELECT COUNT(*) FROM accounts WHERE user_id = $1` //acc_id
	row = dbTransaction.QueryRow(sqlStatement, user_id)
	err = row.Scan(&count)
	if err != nil {
		dbTransaction.Rollback()
		logger.WithField("err", err.Error()).Error("Invalid account id")
		return
	}
	if count > 1 {
		sqlStatement = `DELETE FROM accounts WHERE id = $1`
		_, err = dbTransaction.Exec(sqlStatement, acc_id)
		if err != nil {
			dbTransaction.Rollback()
			logger.WithField("err", err.Error()).Error("Error deleting account")
			return
		}
	}
	if count == 1 {
		sqlStatement = `DELETE FROM users WHERE id = $1` //user_id
		_, err = s.db.Exec(sqlStatement, user_id)
		if err != nil {
			dbTransaction.Rollback()
			logger.WithField("err", err.Error()).Error("Error deleting user")
			return
		}
	}
	err = dbTransaction.Commit()
	if err != nil {
		dbTransaction.Rollback()
		logger.WithField("err", err.Error()).Error("Error commiting transaction")

		return
	}
	return
}
