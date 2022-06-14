CREATE TABLE users(
    userID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    tokenID int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tokenID) REFERENCES tokens(tokenID)
);

CREATE TABLE tokens (
    tokenID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    selector varchar(255) NOT NULL,
    token varchar(255) NOT NULL
);