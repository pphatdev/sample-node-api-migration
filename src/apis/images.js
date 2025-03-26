import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate.js'
import { getImage, create, uploadSingle, get, getOnce } from '../controllers/images.js'

export const ROUTE = Router()

/**
 * Upload endpoint - Accept multipart form data
 */
ROUTE.post("/upload", uploadSingle, create)

/**
 * Set authenticate for all routes below
 */
// ROUTE.use((req, res, next) => authenticateToken(req, res, next))

/**
 * Retrieve file with transformations - Accept params and query
 */
ROUTE.get("/image/:filename", getImage)


ROUTE.get("/", get)

ROUTE.get("/:id", getOnce)


export default ROUTE