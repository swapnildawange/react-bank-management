package models

import "time"

type User struct {
	Id          string    `db:"id" json:"id"`
	FirstName   string    `db:"first_name" json:"first_name"`
	MiddleName  string    `db:"middle_name" json:"middle_name"`
	LastName    string    `db:"last_name" json:"last_name"`
	Email       string    `db:"email" json:"email"`
	Password    string    `db:"password" json:"password"`
	Role        string    `db:"role" json:"role"`
	Gender      string    `db:"gender" json:"gender"`
	DateOfBirth time.Time `db:"date_of_birth" json:"date_of_birth"`
	Created_at  time.Time `db:"created_at" json:"created_at"`
	Updated_at  time.Time `db:"updated_at" json:"updated_at"`
}

// get all users
type GetUsersResponse struct {
	Id          string    `db:"id" json:"id"`
	AccId       string    `db:"accid" json:"accID"`
	FirstName   string    `db:"first_name" json:"first_name"`
	MiddleName  string    `db:"middle_name" json:"middle_name"`
	LastName    string    `db:"last_name" json:"last_name"`
	Email       string    `db:"email" json:"email"`
	Gender      string    `db:"gender" json:"gender"`
	Balance     int       `db:"balance" json:"balance"`
	Type        string    `db:"type" json:"type"`
	DateOfBirth time.Time `db:"date_of_birth" json:"date_of_birth"`
	Created_at  time.Time `db:"created_at" json:"created_at"`
	Updated_at  time.Time `db:"updated_at" json:"updated_at"`
}

type GetUserResponse struct {
	Id          string    `db:"id" json:"id"`
	AccId       string    `db:"accid" json:"accID"`
	FirstName   string    `db:"first_name" json:"first_name"`
	MiddleName  string    `db:"middle_name" json:"middle_name"`
	LastName    string    `db:"last_name" json:"last_name"`
	Email       string    `db:"email" json:"email"`
	Gender      string    `db:"gender" json:"gender"`
	Balance     int       `db:"balance" json:"balance"`
	Password    string    `db:"password" json:"password"`
	Role        string    `db:"role" json:"role"`
	Type        string    `db:"type" json:"type"`
	DateOfBirth time.Time `db:"date_of_birth" json:"date_of_birth"`
	Created_at  time.Time `db:"created_at" json:"created_at"`
	Updated_at  time.Time `db:"updated_at" json:"updated_at"`
}
type CreateUserRequest struct {
	Id         string `json:"id"`
	FirstName  string `json:"firstName"`
	MiddleName string `json:"MiddleName"`
	LastName   string `json:"LastName"`
	Gender     string `json:"gender"`
	Day        int    `json:"day"`
	Month      int    `json:"month"`
	Year       int    `json:"year"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Type       string `json:"accountType"`
}

type CreateUserResponse struct {
	Id         string `db:"id" json:"id"`
	FirstName  string `db:"first_name" json:"first_name"`
	MiddleName string `json:"middle_name"`
	LastName   string `json:"last_name"`
}

type LoginResponse struct {
	Id    string `json:"id"`
	AccId string `json:"acc_id"`
	Role  string ` json:"role"`
	Token string ` json:"token"`
}
type DeleteUserRequest struct {
	Id string `json:"id"`
}
