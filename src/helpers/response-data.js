import { VERSION } from "../db/configs/index.js"

export class Response {

    success = (data, total = null, ...options) => {
        return {
            status: 200,
            success: true,
            version: VERSION,
            total: total,
            result: data,
            ...options
        }
    }

    notFound = (data, ...options) => {
        return {
            status: 404,
            success: true,
            version: VERSION,
            result: data,
            ...options
        }
    }

    insetSuccess = (...options) => {
        return {
            status: 200,
            date: this.date,
            result: options
        }
    }

    insetFailed = (...options) => {
        return {
            status: 400,
            date: this.date,
            result: options
        }
    }

    serverError = (message = "", ...options) => {
        return {
            status: 500,
            success: false,
            version: VERSION,
            result: message,
            ...options
        }
    }

    authSuccess = (data, ...options) => {
        return {
            status: 200,
            success: true,
            version: VERSION,
            result: data,
            ...options
        }
    }

    authClient = (message, ...options) => {
        return {
            status: 400,
            success: false,
            version: VERSION,
            result: message,
            ...options
        }
    }

    unAuth = (message, ...options) => {
        return {
            status: 401,
            success: false,
            version: VERSION,
            result: message,
            ...options
        }
    }

    invalidToken = (message, ...options) => {
        return {
            status: 403,
            success: false,
            version: VERSION,
            result: message,
            ...options
        }
    }

    validateError = (data) => {
        let errors = {};
        data.forEach(error => {
            errors[error.path] = (()=> {
                if (!error?.message) {
                    const field = error.type.charAt(0).toUpperCase() + error.type.slice(1).toLowerCase();
                    return `${field} is ${(error?.msg)?.toLowerCase()}`
                }
                return `${error?.message.replace(/"/g, '')}`
            })();
        });

        return {
            status: 422,
            success: false,
            version: VERSION,
            result: errors
        };
    }
}