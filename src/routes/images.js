import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate.js'
import { getImage, create, uploadSingle, getOnce } from '../controllers/images.js'
import { Validation } from '../helpers/validator.js'
import { Controller } from '../helpers/response/controller.js'
import ImageModel from '../models/images.js'

export const ROUTE = Router()

ROUTE.get("/", Validation.base.list, async (req, res) => {
    const response = await ImageModel.getData(req.query)
    res.send(response)
})

ROUTE.get("/image/:filename", getImage)

ROUTE.get("/:id", Validation.base.detail, (req, res) => Controller.getOnce(req, res, getOnce))

ROUTE.use((req, res, next) => authenticateToken(req, res, next))

ROUTE.post("/upload", uploadSingle, create)


export default ROUTE