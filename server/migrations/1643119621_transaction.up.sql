CREATE TYPE statusValues AS ENUM ('success' , 'failure');
CREATE TYPE typeStatus AS ENUM ('debit' , 'credit');

CREATE TABLE transaction (
  id VARCHAR(60) PRIMARY KEY,
  account_id VARCHAR(60) NOT NULL REFERENCES accounts(id),
  amount INTEGER NOT NULL,
  type typeStatus NOT NULL,
  status statusValues NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);