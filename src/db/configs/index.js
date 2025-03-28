import { config } from "dotenv";
config()

export const VERSION = process.env.VERSION || "v1"
export const PORT = process.env.PORT || 3000
export const ENV = process.env.NODE_ENV || "development"

// Auth Login
export const LOGIN_EXP = new Date(new Date().getTime() + 2627999999.97164)


// Paginations
export const PAGE       = process.env.PAGE || 1
export const LIMIT      = process.env.LIMIT || -1
export const SEARCH     = { column: [], value: null, condition: "or", withWere: true }
export const SORT       = { column: [], value: "asc" }
export const COLUMNS    = []

export const IMAGES_PATH = process.env.IMAGES_PATH || "uploads/images/"
export const APP_SECRET_KEY = process.env.APP_SECRET_KEY || "my-secret-key"