import { Router } from 'express'
export const routes = Router()
import { getAllUsers } from '../../controllers/users.js'

routes.get("/", (req, res) => {

    const request   = req.query
    const data      = getAllUsers()
    console.log(data);
    res.send(
        {
            status: 200,
            path: "/api/user",
            date: new Date(),
            result: request
        }
    )
})

export default routes