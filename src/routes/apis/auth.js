import { Router } from 'express'
import { login } from '../../controllers/auth.js'
import bodyParser from 'body-parser'
export const ROUTE = Router()

ROUTE.use(bodyParser.urlencoded({ extended: true }))
ROUTE.use(bodyParser.json())


ROUTE.post( "/", async (req, res) =>
{
    const data     = await login(req)
    res.send(data)
})

export default ROUTE