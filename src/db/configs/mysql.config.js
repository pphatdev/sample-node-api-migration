import mysql from "mysql2";
import { db } from "./env.js";

const config = {
    host: db.host,
    port: db.port,
    database: db.database,
    user: db.user,
    password: db.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

export const client = mysql.createPool(config).promise();

// Test the connection
client.getConnection()
    .then(connection => {
        console.log('\x1b[32mSuccessfully connected to MySQL database.\x1b[0m');
        connection.release();
    })
    .catch(err => {
        console.log(`\n\x1b[41mCould not connect to MySQL database:\x1b[0m`);
        console.table([err]);
        console.log(`\n\n\x1b[41mConnection information:\x1b[0m`);
        console.table([config]);
    });