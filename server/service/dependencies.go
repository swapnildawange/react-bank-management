package service

import (
	"go_bank_app/db"
	"go_bank_app/helpers"
)

type Dependencies struct {
	Store      db.Storer
	JWTService helpers.JWTService
	// define other service dependencies
}
