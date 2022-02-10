package db

import (
	"context"
	"go_bank_app/models"
	"time"

	"github.com/google/uuid"
	logger "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

func (s *pgStore) GetUser(ctx context.Context, email string) (user models.GetUserResponse, err error) {
	tempUser := models.GetUserResponse{}
	err = s.db.GetContext(ctx, &tempUser, "select * from users where email=$1", email)
	if err != nil {
		return
	}
	if tempUser.Role == "Admin" {
		err = s.db.GetContext(ctx, &user, getAdminQuery, email)
	} else {
		err = s.db.GetContext(ctx, &user, getUserQuery, email)
	}

	if err != nil {
		return
	}
	return
}

func (s *pgStore) GetUsers(ctx context.Context) (user []models.GetUsersResponse, err error) {
	err = s.db.SelectContext(ctx, &user, getUsers)

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
	user.DateOfBirth = time.Date((req.Year), time.Month(req.Month), (req.Day), time.Now().Hour(), time.Now().Minute(), time.Now().Second(), 0, time.UTC)
	user.Email = req.Email
	bytes, err := bcrypt.GenerateFromPassword([]byte(req.Password), 12)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error encrypting password")
		return
	}
	user.Password = string(bytes)
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

func (s *pgStore) GetUserDetails(ctx context.Context, id string) (user models.GetUserResponse, err error) {
	err = s.db.GetContext(ctx, &user, getUserDetails, id)
	if err != nil {
		return
	}
	return
}
