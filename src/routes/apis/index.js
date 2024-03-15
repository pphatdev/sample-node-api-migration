import { Router } from 'express'
import { routes as users } from './users.js'
const routes    = Router()
const version   = process.env.VERSOION || "v1"
const api       = `/api/${version}`

// Users
routes.use(`${api}/users` , users)

// Defualt
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