import { Router } from 'express'
import { login } from '../../controllers/auth.js'
export const ROUTE = Router()


ROUTE.post( "/", async (req, res) =>
{
    const data     = await login(req)
    res.send(data)
})

export default ROUTE