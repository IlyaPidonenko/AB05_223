import mariadb from 'mariadb'
import { Pool } from 'mariadb'
import { ACCOUNTS } from './schema'

export class Database {
  // Properties
  private _pool: Pool
  // Constructor
  constructor() {
    this._pool = mariadb.createPool({
      database: process.env.DB_NAME || 'minitwitter',
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'minitwitter',
      password: process.env.DB_PASSWORD || 'supersecret123',
      connectionLimit: 5,
    })
    this.initializeDBSchema()
  }
  // Methods
  private initializeDBSchema = async () => {
    console.log('Initializing DB schema...')
    await this.executeSQL(ACCOUNTS)
  }

  public executeSQL = async (query: string) => {
    try {
      const conn = await this._pool.getConnection()
      const res = await conn.query(query)
      conn.end()
      return res
    } catch (err) {
      console.log(err)
    }
  }

  public executeTransaction = async (queries: string[]): Promise<void> => {
    let conn;
    try {
        conn = await this._pool.getConnection();
        await conn.beginTransaction();

        for (const query of queries) {
            await conn.query(query);
        }

        await conn.commit();
    } catch (err) {
        if (conn) {
            await conn.rollback();
        }
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
}


}
