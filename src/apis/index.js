import bodyParser from 'body-parser'

import { Router } from 'express'
import { VERSION } from '../db/configs/index.js'
import { ROUTE as FILES } from './images.js'
import { rateLimit } from 'express-rate-limit'

const API   = `/source/${VERSION}`
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
 * Files Route Control
 *------------------------------------------------------------------|
 * Method | endpoint                        | middleware            |
 *------------------------------------------------------------------|
 * POST   | /api/${VERSION}/files/upload    | null                  |
 * GET    | /api/${VERSION}/files/image/:filename | null           |
 * GET    | /api/${VERSION}/files           | null                  |
 *------------------------------------------------------------------|
*/
ROUTE.use(`${API}/files` , FILES)


export default ROUTE