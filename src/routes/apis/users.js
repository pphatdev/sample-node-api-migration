import { Router } from 'express'
import { create, update, get } from '../../controllers/users.js'
import { authenticateToken } from '../../middlewares/authenticate.js'
export const ROUTE = Router()

ROUTE.use((req, res, next) => authenticateToken(req, res, next))


ROUTE.get("/", async (req, res) => {
    /**
     * Accept only request query
     */
    const response = await get(req.query)
    res.send(response)
})


ROUTE.get("/:id", async (req, res) => {
    /**
     * Accept only params url id
     */
    const response = await get({id: req.params.id})
    res.send(response)
})


ROUTE.post("/", async (req, res) => {
    /**
     * Accept only request body
     */
    const response = await create(req.body)
    res.send(response)
})


ROUTE.put("/", async (req, res) => {
    /**
     * Accept only request body
     */
    const response = await update(req.body)
    res.send(response)
})


export default ROUTE