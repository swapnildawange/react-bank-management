package accountservice

import (
	"context"
	"database/sql"
	"go_bank_app/commonspec"

	"github.com/go-kit/log"
)

type DL struct {
	db     *sql.DB
	logger log.Logger
}
type Provider interface {
	NewAccount(ctx context.Context, req commonspec.NewAccountRequest) (commonspec.NewAccountResponse, error)
	MakeTransaction(ctx context.Context, req commonspec.MakeTransactionRequest) (commonspec.MakeTransactionResponse, error)
	// CreateUser(ctx context.Context, user User) error
	// GetUser(ctx context.Context, id string) (string, error)
}

func NewDL(db *sql.DB, logger log.Logger) Provider {
	return &DL{
		db:     db,
		logger: log.With(logger, "repo", "sql"),
	}
}

func (dl *DL) NewAccount(ctx context.Context, req commonspec.NewAccountRequest) (commonspec.NewAccountResponse, error) {
	var res commonspec.NewAccountResponse
	return res, nil
}
func (dl *DL) MakeTransaction(ctx context.Context, req commonspec.MakeTransactionRequest) (commonspec.MakeTransactionResponse, error) {
	var res commonspec.MakeTransactionResponse
	return res, nil
}
