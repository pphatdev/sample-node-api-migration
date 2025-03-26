import multer from 'multer'
import path from 'path'
import { DESTINATION } from '../db/configs/index.js'

const storage = multer.diskStorage({
    destination: `../${DESTINATION}/public/media/file/crm/uploadfile`,
    filename: (req, file, cb) => {
        const uniqueId = crypto.randomUUID()
        cb(null, uniqueId + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WebP allowed.'), false)
    }
}

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
})