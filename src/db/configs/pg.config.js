import pgsql from "pg";
import { db } from "./env.js";
const { Client } = pgsql

export const client = new Client({
    host: db.host,
    port: db.port,
    database: db.database,
    user: db.user,
    password: db.password,
})

client.connect(err => {
    if(err)
        return console.error(`\ncould not connect to postgres '${err.code}\n`);
});