const ACCOUNTS = `
CREATE TABLE IF NOT EXISTS accounts (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    balance INT,
    PRIMARY KEY (id)
);
`



export { ACCOUNTS }
