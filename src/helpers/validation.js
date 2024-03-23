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

}
