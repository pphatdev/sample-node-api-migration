import { Router } from 'express'
import { create, update, get } from '../../controllers/users.js'
export const routes = Router()

routes.get("/", async (req, res) =>
{
    const request  = req.query
    const data     = await get(request)
    res.send(data)
})


routes.get("/:id", async (req, res) =>
{
    const data  = await get({id: req.params.id})
    res.send(data)
})


routes.post("/", async (req, res) =>
{
    const request  = req.query
    const data     = await create(request)
    res.send(data)
})


routes.put("/:id", async (req, res) =>
{
    const request  = req.query
    const data     = await update(request)
    res.send(data)
})

export default routes