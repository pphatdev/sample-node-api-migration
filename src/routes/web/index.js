import { Router } from 'express'
const routes = Router()

// Web route
const web = "/"

app.set('view engine', 'pug')

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