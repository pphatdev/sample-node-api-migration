import { Router } from 'express'
export const routes = Router()

// Web route
const web = "/"

// Defualt
routes.get(web, (req, res) => {
    res.send(
        {
            status: 200,
            path: web,
            date: new Date(),
            result: req.query
        }
    )
})

export default routes