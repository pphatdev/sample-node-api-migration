import { Router } from 'express'
import { updatePassword } from '../../controllers/password.js'
export const ROUTE = Router()

ROUTE.put("/",  async (req, res) =>
{
    const request  = req.body
    const data     = await updatePassword(request)
    res.send(data)
})

export default ROUTE