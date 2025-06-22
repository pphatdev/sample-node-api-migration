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
        detail: query('id').isUUID().withMessage('ID must be a valid UUID'),
        id: query('id').isNumeric().withMessage('ID must be a valid number')
    }

    static idUUID = query('id').isUUID().withMessage('ID must be a valid UUID')
    static id = query('id').isNumeric().withMessage('ID must be a valid number')
}