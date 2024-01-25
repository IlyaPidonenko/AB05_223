"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNTS = void 0;
var ACCOUNTS = "\nCREATE TABLE IF NOT EXISTS accounts (\n    id INT NOT NULL AUTO_INCREMENT,\n    name VARCHAR(255) NOT NULL,\n    balance INT,\n    PRIMARY KEY (id)\n);\n";
exports.ACCOUNTS = ACCOUNTS;
