import { Router } from 'express'
import { create, update, get , getOnce } from '../controllers/users.js'
import { authenticateToken } from '../middlewares/authenticate.js'
import { Validation } from '../helpers/validator.js'
import { Controller } from '../helpers/response/base.js'

export const ROUTE = Router()


/**
 * Accept only request body
 */
ROUTE.post("/", async (req, res) => {
    const response = await create(req.body)
    res.send(response)
})


/**
 * Set authenticate
 */
ROUTE.use((req, res, next) => authenticateToken(req, res, next))


/**
 * Accept only request query
 */
ROUTE.get("/",
    Validation.base.list,
    async (req, res) => Controller.get(req, res, get)
)


/**
 * Accept only params url id
 */
ROUTE.get("/:id", async (req, res) => Controller.getOnce(req, res, getOnce))


/**
 * Accept only request body
 */
ROUTE.put("/", async (req, res) => {
    const response = await update(req.body)
    res.send(response)
})


export default ROUTE