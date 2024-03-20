export class Response {

    constructor() {
        this.date   = new Date()
    }

    success = (response) => {
        const data = response || {}
        return {
            status: 200,
            date: this.date,
            result: data
        }
    }

    client = (response) => {
        const data = response || {}
        return {
            status: 404,
            date: this.date,
            result: data
        }
    }

    forbidden = (response) => {
        const data = response || {}
        return {
            status: 403,
            date: this.date,
            result: data
        }
    }

    server = (response) => {
        const data = response || {}
        return {
            status: 500,
            date: this.date,
            result: data
        }
    }
}