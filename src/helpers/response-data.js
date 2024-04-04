import { VERSION } from "../db/configs/index.js"

export class Response {

    success = (data, total = 0, ...options) => {
        return {
            status: 200,
            total: total,
            success: true,
            version: VERSION,
            result: data,
            ...options
        }
    }

    notFound = (data, ...options) => {
        return {
            status: 400,
            success: true,
            version: VERSION,
            result: data,
            ...options
        }
    }

    serverError = (message = "", ...options) => {
        return {
            status: 500,
            version: VERSION,
            success: false,
            message: message,
            ...options
        }
    }
}