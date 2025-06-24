import { Router } from 'express'
import { create, update, get , getOnce } from '../controllers/users.js'
import { authenticateToken } from '../middlewares/authenticate.js'
import { Validation } from '../helpers/validator.js'
import { getData } from '../models/users.js'

export const ROUTE = Router()

ROUTE.post("/", async (req, res) => res.send(await create(req.body)) )

ROUTE.use((req, res, next) => authenticateToken(req, res, next))

ROUTE.get("/",
    Validation.base.list,
    async (req, res) => {
        const response = await getData(req.params)
        res.send(response)
    }
)

ROUTE.get("/:id",
    Validation.base.id,
    async (req, res) => {
        const response = await getOnce(req.params)
        res.send(response)
    }
)

ROUTE.put("/", async (req, res) => {
    const response = await update(req.body)
    res.send(response)
})

export default ROUTE