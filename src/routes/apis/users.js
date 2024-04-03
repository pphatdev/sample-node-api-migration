import { Router } from 'express'
import { បង្កើតអ្នកប្រើប្រាស់ថ្មី, អ្នកប្រើប្រាស់ទាំងអស់ } from '../../controllers/users.js'
export const routes = Router()

routes.get("/", async (req, res) => {

    const ការស្នើបន្ថែម  = req.query
    const ទិន្នន័យ     = await អ្នកប្រើប្រាស់ទាំងអស់(ការស្នើបន្ថែម)
    res.send(ទិន្នន័យ)
})

routes.post("/", async (req, res) => {

    const ការស្នើបន្ថែម  = req.query
    const ទិន្នន័យ     = await បង្កើតអ្នកប្រើប្រាស់ថ្មី(ការស្នើបន្ថែម)
    res.send(ទិន្នន័យ)
})

export default routes