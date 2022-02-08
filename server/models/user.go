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

type CreateUserRequest struct {
	Id         string `json:"id"`
	FirstName  string `json:"firstName"`
	MiddleName string `json:"MiddleName"`
	LastName   string `json:"LastName"`
	Gender     string `json:"gender"`
	Day        int16  `json:"day"`
	Month      int16  `json:"month"`
	Year       int16  `json:"year"`
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

type DeleteUserRequest struct {
	Id string `json:"id"`
}
