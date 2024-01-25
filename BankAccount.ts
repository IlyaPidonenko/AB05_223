import { Database } from './database';

class BankAccount {
    accountNumber: string;
    accountBalance: number;
    pinCode: string;

    constructor(accountNumber: string, accountBalance: number, pinCode: string) {
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
        this.pinCode = pinCode;
    }

    async loadAccountInfo(db: Database): Promise<void> {
        const query = `SELECT * FROM accounts WHERE account_number = '${this.accountNumber}'`;
        const result = await db.executeSQL(query);

        if (result && result[0]) {
            const accountInfo = result[0];
            this.accountBalance = accountInfo.balance;
            // hier können weitere Daten geladen werden, falls benötigt
        } else {
            throw new Error('Account not found in the database');
        }
    }

    async transferMoney(toAccount: BankAccount, amount: number, db: Database): Promise<void> {
        const fromAccountQuery = `UPDATE accounts SET balance = balance - ${amount} WHERE account_number = '${this.accountNumber}'`;
        const toAccountQuery = `UPDATE accounts SET balance = balance + ${amount} WHERE account_number = '${toAccount.accountNumber}'`;

        await db.executeTransaction([fromAccountQuery, toAccountQuery]);
    }
}