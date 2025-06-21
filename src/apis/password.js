import { Router } from 'express'
import { updatePassword, get, getOnce } from '../controllers/password.js'
import { authenticateToken } from '../middlewares/authenticate.js'
export const ROUTE = Router()

ROUTE.use((req, res, next) => authenticateToken(req, res, next))

ROUTE.get("/",  async (req, res) => {
    const data = await get(req.query)
    res.send(data)
})

ROUTE.get("/:id",  async (req, res) => {
    const data = await getOnce(req.params)
    res.send(data)
})

ROUTE.put("/",  async (req, res) => {
    const data = await updatePassword(req.body)
    res.send(data)
})

export default ROUTE