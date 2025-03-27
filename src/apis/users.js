import { Router } from 'express'
import { create, update, get, getOnce } from '../controllers/users.js'
import { authenticateToken } from '../middlewares/authenticate.js'
import Joi from 'joi'
import { Response } from '../helpers/response-data.js'
import { query, validationResult } from 'express-validator'
import { Validation } from '../helpers/validator.js'


export const ROUTE = Router()
const response = new Response()


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
    async (req, res) => {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            return res.status(422).json(
                response.validateError(errors)
            );
        }
        res.send(await get({
            limit: -1,
            sort: 'asc',
            page: 1,
            ...req.params,
            ...req.query,
        }))
    })

/**
 * Accept only params url id
 */
ROUTE.get("/:id", async (req, res) => {

    const query = { ...req.params, ...req.query }
    const schema = Joi.object({
        id: Joi.number().required()
    });

    const { error } = schema.validate(query);

    if (error ) {
        return res.status(422).json(
            response.validateError(error.details)
        );
    }

    res.send(await getOnce(query))
})

/**
 * Accept only request body
 */
ROUTE.put("/", async (req, res) => {
    const response = await update(req.body)
    res.send(response)
})


export default ROUTE