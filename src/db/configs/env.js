import { config } from "dotenv";
config()

export const db = {
    host: process.env?.DB_HOST,
    port: process.env?.DB_PORT,
    database: process.env?.DB_NAME,
    user: process.env?.DB_USER,
    password: process.env?.DB_PWD,
}