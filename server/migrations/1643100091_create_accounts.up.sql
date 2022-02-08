CREATE TYPE types AS ENUM ('Saving', 'Current');
CREATE TABLE accounts(
    id VARCHAR(65) PRIMARY KEY,
    user_id VARCHAR(45) NOT NULL,
    balance INTEGER NOT NULL,
    type types NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
	  ON DELETE CASCADE
);