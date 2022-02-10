package db

const (
	updateAccountinfo     = "UPDATE accounts  SET type = $1,updated_at = $2  WHERE id = $3  RETURNING id,type,updated_at"
	listTransaction       = "SELECT * FROM transaction where account_id = $1 order by created_at desc;"
	getUserQuery          = `SELECT users.id, users.first_name,users.middle_name,users.last_name,users.gender,users.date_of_birth,users.email,users.password,users.role, users.created_at,accounts.id as accid,accounts.balance ,accounts.type  FROM users join accounts on users.id = accounts.user_id where users.email=$1;`
	selectStatement       = "SELECT balance FROM accounts where id = $1"
	updateStatementDebit  = "UPDATE accounts SET balance = balance + $2 WHERE id = $1;"
	updateStatementCredit = "UPDATE accounts SET balance = $2 WHERE id = $1;"
	checkStatement        = "SELECT COUNT(id) FROM accounts where id = $1"
	insertStatement       = "INSERT INTO transaction( id, account_id, amount, type, status, created_at) VALUES ($1, $2, $3, $4, $5, $6);"
	createUser            = `INSERT INTO users (id, first_name,middle_name,last_name,gender,date_of_birth, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11)`
	createAccount         = `INSERT INTO accounts (id, user_id, balance, type, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
	getUsers              = "SELECT users.id, users.first_name,users.middle_name,users.last_name,users.gender,users.date_of_birth,users. email, users.created_at,accounts.id as accID,accounts.balance ,accounts.type  FROM users join accounts on users.id = accounts.user_id;"
	getUserDetails        = "SELECT users.id, users.first_name,users.middle_name,users.last_name,users.gender,users.date_of_birth,users. email, users.created_at,accounts.id as accID,accounts.balance ,accounts.type  FROM users join accounts on users.id = accounts.user_id where users.id=$1;"
)
