import { Router } from 'express'
import { routes as users } from './users.js'
import { routes as passwords } from './password.js'

const routes    = Router()
const version   = process.env.VERSOION || "v1"
const api       = `/api/${version}`


/**
 * User Route Control
*/
routes.use(`${api}/users` , users)


/**
 * Password Route Control
*/
routes.use(`${api}/password` , passwords)


/**
 * Defualt Route
*/
routes.get(api, (req, res) => {
    res.send(
        {
            status: 200,
            path: api,
            date: new Date(),
            result: req.query
        }
    )
})

export default routes