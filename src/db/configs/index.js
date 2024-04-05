import { config } from "dotenv";
config()

export const VERSION = process.env.VERSION || "v1"

// Auth Login
export const LOGIN_EXP = new Date(new Date().getTime() + 2627999999.97164)


// Paginations
export const PAGE   = process.env.PAGE || 1
export const LIMIT  = process.env.PAGE || 20
export const SEARCH = { column: [], value: null, condition: "or", withWere: true }
export const SORT   = { column: [], value: "asc" }
