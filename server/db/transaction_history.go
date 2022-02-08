package db

import (
	"context"
	"database/sql"
	"go_bank_app/models"
	"time"

	uuid "github.com/google/uuid"
	logger "github.com/sirupsen/logrus"
)

func (s *pgStore) storeTransaction(ctx context.Context, trans models.TransactionData, dbTransaction *sql.Tx) (id string, err error) {
	id = uuid.NewString()

	TimeStamp := time.Now()

	_, err = dbTransaction.Exec(insertStatement, id, trans.Id, trans.Amount, trans.Type, trans.Status, TimeStamp)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error updating database transaction")
		dbTransaction.Rollback()
		return
	}
	return
}
