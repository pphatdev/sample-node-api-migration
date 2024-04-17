import { Router } from 'express'
import { updatePassword, get, getOnce } from '../controllers/password.js'
import { authenticateToken } from '../middlewares/authenticate.js'
export const ROUTE = Router()

/**
 *----------------------------------------------------------|
 * Method | endpoint                | middleware            |
 *----------------------------------------------------------|
 * GET    | /api/v1/password        | {authenticateToken}   |
 * GET    | /api/v1/password/:id    | {authenticateToken}   |
 * PUT    | /api/v1/password        | {authenticateToken}   |
 *----------------------------------------------------------|
*/

ROUTE.use((req, res, next) => authenticateToken(req, res, next))

/**
 * Accept only request query
 */
ROUTE.get("/",  async (req, res) => {
    const data     = await get(req.query)
    res.send(data)
})


/**
 * Accept only request params id
 */
ROUTE.get("/:id",  async (req, res) => {
    const data     = await getOnce(req.params)
    res.send(data)
})


/**
 * Accept only request body
 */
ROUTE.put("/",  async (req, res) => {
    const data     = await updatePassword(req.body)
    res.send(data)
})

export default ROUTE