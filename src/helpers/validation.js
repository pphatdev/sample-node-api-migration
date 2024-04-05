export class isValidated {

    /**
     * Check Password Validation pattern
     * @param {String} value
     * @returns
     */
    password = (value = "") => {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value);
    }

    /**
     * Email Validation pattern
     * @param {String} value
     * @returns
     */
    email = (value = "") => {
        return /[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]{2,5}$/i.test(value);
    }


    /**
     * Website Validation pattern
     * @param {String} value
     * @returns
     */
    website = (value = "") => {
        return /https?:\/\/(www\.)?[a-z0-9]+\.([a-z])/i.test(value);
    }

    /**
     * Check value Validation pattern
     * @param {String} value
     * @returns
     */
    empty = (value = "") => {
        return value == null || value == "" || value == undefined;
    }

    /**
     * Check number Validation pattern
     * @param {String} value
     * @returns
     */
    isNum = (value = "") => {
        if (typeof value == "number") {
            return true
        }
        return false
    }
}


/**
 * Return required message
 * @param {Object} schema
 * @param {Object} fields
 * @returns
 */
export const required = (schema, fields = {}) => {
    let result;
    const valid = schema.validate(fields).error?.details || []
    Array.from(valid).map( m => { result = m })
    return result
}