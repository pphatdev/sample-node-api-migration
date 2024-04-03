export class Response {

    constructor() {
        this.date   = new Date()
    }

    ជោគជ័យ = (ទិន្នន័យរួម, ទិន្នន័យសរុប = 0, បង្ហាញ = 0,  ...options) => {
        return {
            status: 200,
            date: this.date,
            query: options || {},
            total: ទិន្នន័យសរុប,
            show: បង្ហាញ,
            result: ទិន្នន័យរួម
        }
    }

    list = (data, total = 0, show = 0,  ...options) => {
        return {
            status: 200,
            date: this.date,
            query: options || {},
            total: total,
            show: show,
            result: data
        }
    }

    show = (data,...options) => {
        return {
            status: 200,
            date: this.date,
            query: options || {},
            result: data
        }
    }

    ជោគជ័យលម្អិត = (ទិន្នន័យរួម,...options) => {
        return {
            status: 200,
            date: this.date,
            query: options || {},
            result: ទិន្នន័យរួម
        }
    }

    បញ្ចូលជោគជ័យ = (...options) => {
        return {
            status: 200,
            date: this.date,
            result: options
        }
    }

    បញ្ចូលបរាជ័យ = (...options) => {
        return {
            status: 400,
            date: this.date,
            result: options
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
}