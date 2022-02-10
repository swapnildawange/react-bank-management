package service

import (
	"errors"
	"fmt"
	"go_bank_app/models"
	"net/http"
	"strings"

	logger "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

func ValidateUser(deps Dependencies, rw http.ResponseWriter, req *http.Request, email string, givenPassword string) (user models.GetUserResponse, err error) {
	if email == "" || !strings.Contains(email, "@") {
		err = errors.New("email is invalid")
		rw.Write([]byte("email is invalid"))
		return
	}
	user, err = deps.Store.GetUser(req.Context(), email)
	if err != nil {
		logger.WithField("err", err.Error()).Error("User not found in database")
		rw.WriteHeader(http.StatusInternalServerError)
		rw.Write([]byte("user not found"))
		return
	}
	fmt.Println(user.Password,"sdgsfdghsfd",givenPassword)
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(givenPassword))
	if err != nil {
		logger.WithField("err", err.Error()).Error("invalid credentials given")
		rw.WriteHeader(http.StatusUnauthorized)
		rw.Write([]byte("user not found"))
		return
	}
	return
}
