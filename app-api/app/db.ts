import db from 'mysql2/promise';
import { decrypt } from './cryptr';
import { env } from './server';

export const connection = db.createConnection({
    host: decrypt(env.localhost),
    user: decrypt(env.user),
    password: decrypt(env.password),
    database: decrypt(env.database)
})


export const query = (query: string): Promise<any> => {
    console.log("\n\n================== = = = = QUERY = = = = ==================\n")
    console.log(query)
    console.log("\n================== = = = = = = = = = = = ==================\n\n")
    return connection.then(conn => conn.query(query));
}