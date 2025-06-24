import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate.js'
import { Validation } from '../helpers/validator.js'
import { getData, getDataDetail, insertData, updateData } from '../models/projects.js'
import { uploadSingle } from '../controllers/images.js'
import { Controller } from '../helpers/response/controller.js'

export const ROUTE = Router()

ROUTE.use((req, res, next) => authenticateToken(req, res, next))

ROUTE.post("/",
    uploadSingle,
    async (req, res) => {

        if (!req.file) {
            return res.status(400).send({ message: "No file uploaded." });
        }

        const response = await insertData(req)
        res.send(response)
    }
)

ROUTE.get("/",
    Validation.base.list,
    async (req, res) => {
        const response = await getData(req.query)
        res.send(response)
    }
)

ROUTE.get("/:id", async (req, res) => Controller.getOnce(req, res, getDataDetail))

ROUTE.put("/",
    async (req, res) => {
        const response = await updateData(req.body)
        res.send(response)
    }
)

export default ROUTE