import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate.js'
import { Validation } from '../helpers/validator.js'
import PasswordModel from '../models/password.js'

const { getData, getDataDetail, updateData} = PasswordModel

export const ROUTE = Router()

ROUTE.use((req, res, next) => authenticateToken(req, res, next))

ROUTE.get("/",
    Validation.base.list,
    async (req, res) => {
        const data = await getData(req.query)
        res.send(data)
    }
)

ROUTE.get("/:id",  async (req, res) => {
    const data = await getDataDetail(req.params)
    res.send(data)
})

ROUTE.put("/",  async (req, res) => {
    const data = await updateData(req.body)
    res.send(data)
})

export default ROUTE