import { Router } from 'express'
import { VERSION } from '../../db/configs/index.js'
import { ROUTE as USERS } from './users.js'
import { ROUTE as PASSWORD } from './password.js'

const ROUTE     = Router()
const API       = `/api/${VERSION}`


/**
 * User Route Control
*/
ROUTE.use(`${API}/users` , USERS)


/**
 * Password Route Control
*/
ROUTE.use(`${API}/password` , PASSWORD)


/**
 * Defualt Route
*/
ROUTE.get(API, (req, res) => {
    res.send(
        {
            status: 200,
            v: VERSION,
            date: new Date(),
            result: req.query
        }
    )
})

export default ROUTE