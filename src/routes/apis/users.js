import { Router } from 'express'
import { create, update, get } from '../../controllers/users.js'
export const ROUTE = Router()

ROUTE.get("/", async (req, res) =>
{
    const request   = req.query
    const data      = await get(request)
    res.send(data)
})


ROUTE.get("/:id", async (req, res) =>
{
    const data      = await get({id: req.params.id})
    res.send(data)
})


ROUTE.post("/", async (req, res) =>
{
    const request   = req.query
    const data      = await create(request)
    res.send(data)
})


ROUTE.put("/:id", async (req, res) =>
{
    const id        = req.params.id
    const request   = req.body
    const data      = await update(request, id)
    res.send(data)
})

export default ROUTE