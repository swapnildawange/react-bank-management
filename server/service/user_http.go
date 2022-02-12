package service

import (
	"encoding/json"
	"fmt"
	"go_bank_app/config"
	"go_bank_app/helpers"
	"go_bank_app/models"
	"net/http"

	"github.com/golang-jwt/jwt"
	logger "github.com/sirupsen/logrus"
)

func createUser(deps Dependencies) http.HandlerFunc {

	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		// for cors error
		setupCorsResponse(&rw, req)
		if req.Method == "OPTIONS" {
			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusOK)
			return
		}

		var incoming models.CreateUserRequest

		json.NewDecoder(req.Body).Decode(&incoming)

		user, err := deps.Store.CreateUser(req.Context(), incoming)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		res, err := deps.Store.CreateAccount(req.Context(), incoming, user.Id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error in creating account")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(res)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling users data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.WriteHeader(http.StatusOK)
		rw.Write(respBytes)
	})
}

// @Title loginUser
// @Description login a user
// @Router /login [post]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func loginUserHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		// for cors error
		setupCorsResponse(&rw, req)
		if req.Method == "OPTIONS" {
			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusOK)
			return
		}
		var credentials models.Credentials
		fmt.Println(credentials)

		err := json.NewDecoder(req.Body).Decode(&credentials)
		if err != nil {
			logger.WithField("err", err.Error()).Error(err)
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		user, err := ValidateUser(deps, rw, req, credentials.Email, credentials.Password)
		if err != nil {
			return
		}

		claims := helpers.Claims{
			Id:   user.Id,
			Role: user.Role,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: config.ExpireTime(),
			},
		}

		tokenString, err := deps.JWTService.GenerateToken(claims)
		if err != nil {
			logger.WithField("err", err.Error()).Error(err)
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		res := models.LoginResponse{
			Token: tokenString,
			Id:    user.Id,
			AccId: user.AccId,
			Role:  user.Role,
		}

		respBytes, err := json.Marshal(res)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling users data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

func isloggedin(f http.HandlerFunc, deps Dependencies, role string) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		// for cors error
		setupCorsResponse(&rw, r)
		if r.Method == "OPTIONS" {
			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusOK)
			return
		}
		authHeader := r.Header.Get("Authorization")

		claims, err := deps.JWTService.VerifyToken(authHeader)
		if err != nil {
			logger.WithField("err", err.Error()).Error(err)
			rw.WriteHeader(http.StatusUnauthorized)
			return
		}
		if claims["Role"] == role {
			f(rw, r)
			return
		}
		rw.WriteHeader(http.StatusUnauthorized)
		rw.Write([]byte("not authorized"))
	}
}

func getUsers(deps Dependencies) http.HandlerFunc {
	return func(rw http.ResponseWriter, req *http.Request) {
		setupCorsResponse(&rw, req)
		if req.Method == "OPTIONS" {
			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusOK)
			return
		}

		users, err := deps.Store.GetUsers(req.Context())
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(users)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling users data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.WriteHeader(http.StatusOK)
		rw.Write(respBytes)
	}
}

func getUserDetails(deps Dependencies) http.HandlerFunc {
	return func(rw http.ResponseWriter, req *http.Request) {
		setupCorsResponse(&rw, req)
		if req.Method == "OPTIONS" {
			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusOK)
			return
		}
		query := req.URL.Query()
		id := query.Get("id")
		user, err := deps.Store.GetUserDetails(req.Context(), id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(user)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling users data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.WriteHeader(http.StatusOK)
		rw.Write(respBytes)
	}
}
