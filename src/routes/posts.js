import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate.js'
import { Validation } from '../helpers/validator.js'
import { getData, getDataDetail, insertData, updateData } from '../models/posts.js'
import { Controller } from '../helpers/response/controller.js'

export const ROUTE = Router()

ROUTE.use((req, res, next) => authenticateToken(req, res, next))

ROUTE.post("/",
    async (req, res) => {
        const response = await insertData(req.body)
        res.send(response)
    }
)

ROUTE.get("/",
    Validation.base.list,
    async (req, res) => {
        const response = await getData(req.query)
        res.send(response)
    }
)

ROUTE.get("/:id", async (req, res) => Controller.getOnce(req, res, getDataDetail))

ROUTE.put("/",
    async (req, res) => {
        const response = await updateData(req.body)
        res.send(response)
    }
)

export default ROUTE