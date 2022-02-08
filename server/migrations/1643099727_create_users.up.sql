CREATE TYPE roles AS ENUM ('Admin', 'User');
CREATE TYPE gender AS ENUM ('Male','Female','Other');
CREATE TABLE users(
    id VARCHAR(65) PRIMARY KEY,
    first_name VARCHAR(65) NOT NULL,
    middle_name   VARCHAR(65) NOT NULL,
    last_name VARCHAR(65) NOT NULL,
    gender gender NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(65) NOT NULL,
    role roles,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);