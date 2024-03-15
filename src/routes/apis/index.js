import { Router } from 'express'
import { routes as users } from './users.js'
export const routes = Router()


const api = "/api"
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