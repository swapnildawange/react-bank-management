package commonspec

type User struct {
	ID       int
	Name     string
	Balance  int
	Password string
}

type Account struct {
	ID       int
	UserID   int
	Balance  int
	Password string
}

type Transaction struct {
	ID        int
	AccountID int
	Amount    int
	Password  string
}

type UpdateUserRequest struct {
	User *User
}

type DeleteUserRequest struct {
	User *User
}

type CreateUserRequest struct {
	User *User
}

type NewAccountRequest struct {
	Account *Account
}

type NewAccountResponse struct {
	Account *Account
}

type MakeTransactionRequest struct {
	Transaction *Transaction
}

type MakeTransactionResponse struct {
	Transaction *Transaction
}
