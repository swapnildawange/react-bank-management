package db

import (
	"context"
	"go_bank_app/models"
	"time"

	"github.com/google/uuid"
	logger "github.com/sirupsen/logrus"
)

func (s *pgStore) GetUser(ctx context.Context, email string) (user models.User, err error) {
	err = s.db.GetContext(ctx, &user, getUserQuery, email)
	if err != nil {
		return
	}

	return
}

func (s *pgStore) CreateUser(ctx context.Context, req models.CreateUserRequest) (user models.User, err error) {

	user.Id = uuid.NewString()
	user.FirstName = req.FirstName
	user.MiddleName = req.MiddleName
	user.LastName = req.LastName
	user.Gender = req.Gender
	user.DateOfBirth = time.Date(int(req.Year), time.Month(req.Month), int(req.Day), time.Now().Hour(), time.Now().Minute(), time.Now().Second(), 0, time.UTC)
	user.Email = req.Email
	user.Password = req.Password
	user.Role = "User"
	user.Created_at = time.Now()
	user.Updated_at = time.Now()

	_, err = s.db.Exec(createUser, user.Id, user.FirstName, user.MiddleName, user.LastName, user.Gender, user.DateOfBirth, user.Email, user.Password, user.Role, user.Created_at, user.Updated_at)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating user")
		return
	}

	return
}
