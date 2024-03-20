export class ការឆ្លើយតប {

    constructor() {
        this.date   = new Date()
    }

    ជោកជ័យ = (ទិន្នន័យរួម, ទិន្នន័យសរុប = 0) => {
        return {
            status: 200,
            date: this.date,
            total: ទិន្នន័យសរុប,
            result: ទិន្នន័យរួម
        }
    }
}