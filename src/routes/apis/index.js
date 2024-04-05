import { Router } from 'express'
import { VERSION } from '../../db/configs/index.js'
import { ROUTE as USERS } from './users.js'
import { ROUTE as PASSWORD } from './password.js'
import { ROUTE as AUTH } from './auth.js'
import bodyParser from 'body-parser'

const API   = `/api/${VERSION}`
const ROUTE = Router()

/**
 * Define Body Parser
*/
ROUTE.use(bodyParser.urlencoded({ extended: true }))
ROUTE.use(bodyParser.json())


/**
 * User Route Control
*/
ROUTE.use(`${API}/users` , USERS)


/**
 * Password Route Control
*/
ROUTE.use(`${API}/password` , PASSWORD)


/**
 * Password Route Control
*/
ROUTE.use(`${API}/auth` , AUTH)


/**
 * Defualt Route
*/
ROUTE.get( API, (req, res) => {
    res.send({
        status: 200,
        v: VERSION,
        date: new Date(),
        result: req.query
    })
})

export default ROUTE