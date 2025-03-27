import { query } from 'express-validator'

export class Validation {
    /**
     * Base Validation
     * @param {Array} params
     * @returns
     */
    static list = (params = []) => {
        return [
            query('limit').isNumeric().default(-1).optional(),
            query('sort').isIn(['asc', 'desc']).default('asc').optional(),
            query('page').isNumeric().default(1).optional(),
            ...params
        ]
    }

    static base = {
        list: Validation.list(),
    }
}