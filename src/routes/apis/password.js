import { Router } from 'express'
import { updatePassword } from '../../controllers/password.js'
import bodyParser from 'body-parser'
export const routes = Router()

routes.use(bodyParser.urlencoded({ extended: true }))
routes.use(bodyParser.json())

routes.put("/",  async (req, res) =>
{
    const request  = req.body
    const data     = await updatePassword(request)
    res.send(data)
})

export default routes