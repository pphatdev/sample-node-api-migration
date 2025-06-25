import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate.js'
import { Validation } from '../helpers/validator.js'
import {
    getData,
    getDataDetail,
    insertData,
    updateData,
    getCacheStats,
    clearCache
} from '../models/projects.js'
import { uploadSingle } from '../controllers/images.js'
import { Controller } from '../helpers/response/controller.js'

export const ROUTE = Router()

ROUTE.get("/",
    Validation.base.list,
    async (req, res) => {
        const response = await getData(req.query)
        res.send(response)
    }
)

ROUTE.get("/:id", async (req, res) => Controller.getOnce(req, res, getDataDetail))


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

ROUTE.put("/",
    async (req, res) => {
        const response = await updateData(req.body)
        res.send(response)
    }
)

// Cache management routes (protected)
ROUTE.delete("/cache/clear-all",
    async (req, res) => {
        try {
            await clearCache()
            res.json({
                success: true,
                message: "All projects cache cleared successfully"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to clear cache",
                error: error.message
            })
        }
    }
)


ROUTE.get("/cache/stats",
    async (req, res) => {
        try {
            const stats = await getCacheStats()
            res.json({
                success: true,
                data: stats
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get cache stats",
                error: error.message
            })
        }
    }
)

export default ROUTE