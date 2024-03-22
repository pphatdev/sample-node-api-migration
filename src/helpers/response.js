export class ការឆ្លើយតប {

    constructor() {
        this.date   = new Date()
    }

    ជោគជ័យ = (ទិន្នន័យរួម, ទិន្នន័យសរុប = 0, បង្ហាញ = 0,  ...ជម្រើស) => {
        return {
            status: 200,
            date: this.date,
            query: ជម្រើស || {},
            total: ទិន្នន័យសរុប,
            show: បង្ហាញ,
            result: ទិន្នន័យរួម
        }
    }

    ជោគជ័យលម្អិត = (ទិន្នន័យរួម,...ជម្រើស) => {
        return {
            status: 200,
            date: this.date,
            query: ជម្រើស || {},
            result: ទិន្នន័យរួម
        }
    }
}