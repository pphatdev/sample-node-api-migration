import { Router } from 'express'
import { updatePassword, get } from '../../controllers/password.js'
export const ROUTE = Router()


ROUTE.get("/",  async (req, res) => {
    /**
     * Accept only request query
     */
    const data     = await get(req.query)
    res.send(data)
})


ROUTE.get("/:id",  async (req, res) => {
    /**
     * Accept only request params id
     */
    const data     = await get(req.params)
    res.send(data)
})


ROUTE.put("/",  async (req, res) => {
    /**
     * Accept only request body
     */
    const data     = await updatePassword(req.body)
    res.send(data)
})

export default ROUTE