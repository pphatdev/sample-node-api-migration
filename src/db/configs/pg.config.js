import pgsql from "pg";
import { db } from "./env.js";
const { Client } = pgsql

const config = {
    host: db.host,
    port: db.port,
    database: db.database,
    user: db.user,
    password: db.password,
}

export const client = new Client(config)

client.connect(err => {
    if(err){
        console.log(`\n\x1b[41mcould not connect to database:\x1b[0m`);
        console.table([err])
        console.log(`\n\n\x1b[41mConnection information:\x1b[0m`);
        console.table([config])
    }
});