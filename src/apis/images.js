import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate.js'
import { getImage, create, uploadSingle, get, getOnce } from '../controllers/images.js'

export const ROUTE = Router()


ROUTE.use((req, res, next) => authenticateToken(req, res, next))

ROUTE.post("/upload", uploadSingle, create)

ROUTE.get("/image/:filename", getImage)

ROUTE.get("/", get)

ROUTE.get("/:id", getOnce)

export default ROUTE