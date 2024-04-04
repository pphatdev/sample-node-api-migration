import { Router } from 'express'
import { ROUTE as USERS } from './users.js'
import { ROUTE as PASSWORD } from './password.js'

const ROUTE     = Router()
const version   = process.env.VERSOION || "v1"
const api       = `/api/${version}`


/**
 * User Route Control
*/
ROUTE.use(`${api}/users` , USERS)


/**
 * Password Route Control
*/
ROUTE.use(`${api}/password` , PASSWORD)


/**
 * Defualt Route
*/
ROUTE.get(api, (req, res) => {
    res.send(
        {
            status: 200,
            path: api,
            date: new Date(),
            result: req.query
        }
    )
})

export default ROUTE