import { Router } from 'express'
import { login } from '../controllers/auth.js'

export const ROUTE = Router()

ROUTE.post( "/", async (req, res) => {
    const response = await login(req.body)
    res.send(response)
})

export default ROUTE