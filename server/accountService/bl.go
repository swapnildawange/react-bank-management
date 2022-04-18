package accountservice

import (
	"context"
	"go_bank_app/commonspec"

	"github.com/go-kit/log"
)

type Service interface {
	NewAccount(context.Context, commonspec.NewAccountRequest) (commonspec.NewAccountResponse, error)
	MakeTransaction(context.Context, commonspec.MakeTransactionRequest) (commonspec.MakeTransactionResponse, error)
}
type BL struct {
	repostory Provider
	logger    log.Logger
}

func NewBL(rep Provider, logger log.Logger) Service {
	return &BL{
		repostory: rep,
		logger:    logger,
	}
}

// type BL struct {
// 	db     DL
// 	logger log.Logger
// }

// func NewBL(dl DL, logger log.Logger) Service {
// 	return &BL{
// 		db:     dl,
// 		logger: log.With(logger, "repo", "sql"),
// 	}
// }

func (bl *BL) NewAccount(ctx context.Context, req commonspec.NewAccountRequest) (commonspec.NewAccountResponse, error) {
	var res commonspec.NewAccountResponse
	return res, nil
}

func (bl *BL) MakeTransaction(ctx context.Context, req commonspec.MakeTransactionRequest) (commonspec.MakeTransactionResponse, error) {
	var res commonspec.MakeTransactionResponse
	return res, nil
}
