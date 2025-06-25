import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate.js'
import { getImage, create, uploadSingle } from '../controllers/images.js'
import { Validation } from '../helpers/validator.js'
import ImageModel from '../models/images.js'

export const ROUTE = Router()

ROUTE.get("/", Validation.base.list, async (req, res) => {
    const response = await ImageModel.getData(req.query)
    res.send(response)
})

ROUTE.get("/:folder/:filename", getImage)

ROUTE.get("/:id", Validation.base.detail, (req, res) => {
    const { id } = req.params
    ImageModel.getDataDetail({ id })
        .then(response => res.send(response))
        .catch(error => res.status(500).send({ error: error.message }))
})

ROUTE.use((req, res, next) => authenticateToken(req, res, next))

ROUTE.post("/upload", uploadSingle, create)


export default ROUTE