import pg from "pg";
import { db } from "./env.js";
const Client = pg.Client;

export const client = new Client({
    host: db.host,
    port: db.port,
    database: db.database,
    user: db.user,
    password: db.password,
})

client.connect()