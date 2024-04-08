import bodyParser from 'body-parser'

import { Router } from 'express'
import { VERSION } from '../../db/configs/index.js'
import { ROUTE as USERS } from './users.js'
import { ROUTE as PASSWORD } from './password.js'
import { ROUTE as AUTH } from './auth.js'
import { rateLimit } from 'express-rate-limit'

const API   = `/api/${VERSION}`
const ROUTE = Router()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false
})


/**
 * Define Body Parser
*/
ROUTE.use(bodyParser.urlencoded({ extended: true }))
ROUTE.use(bodyParser.json())


/**
 * Apply limited all request
*/
ROUTE.use(limiter);


/**
 * Password Route Control
 *------------------------------------------------------------------|
 * Method | endpoint                        | middleware            |
 *------------------------------------------------------------------|
 * POST   | /api/${VERSION}/auth            | null                  |
 *------------------------------------------------------------------|
*/
ROUTE.use(`${API}/auth` , AUTH)


/**
 * User Route Control
 *------------------------------------------------------------------|
 * Method | endpoint                        | middleware            |
 *------------------------------------------------------------------|
 * POST   | /api/${VERSION}/users           | null                  |
 * GET    | /api/${VERSION}/users           | {authenticateToken}   |
 * GET    | /api/${VERSION}/users/:id       | {authenticateToken}   |
 * PUT    | /api/${VERSION}/users           | {authenticateToken}   |
 *------------------------------------------------------------------|
*/
ROUTE.use(`${API}/users` , USERS)


/**
 * Password Route Control
 *------------------------------------------------------------------|
 * Method | endpoint                        | middleware            |
 *------------------------------------------------------------------|
 * GET    | /api/${VERSION}/password        | {authenticateToken}   |
 * GET    | /api/${VERSION}/password/:id    | {authenticateToken}   |
 * PUT    | /api/${VERSION}/password        | {authenticateToken}   |
 *------------------------------------------------------------------|
*/
ROUTE.use(`${API}/password` , PASSWORD)


export default ROUTE