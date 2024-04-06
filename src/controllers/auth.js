import Joi from "joi"
import { required } from "../helpers/validation.js"
import { authLogin } from "../models/auth.js"
import { Response } from "../helpers/response-data.js"

const response      = new Response()

export const login = async (request) => {

    /**
     * កំណត់តម្រូវការទិន្នន័យដែលត្រួវការ
     * @package Joi
     * @param {Required|String} email
     * @param {Required|String} password
     */
    const condition = required(
        Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        request
    )

    if (condition)
        /**
         * ករណីមានមិនទិន្នន័យមិនគ្រប់ បង្ហាញព័ត៌មានបរាជ័យ
         */
        return response.authClient({ message : condition.message })
    else
        /**
         * បង្ហាញព័ត៌មានដែលជោគជ័យ
         */
        return await authLogin(request);
}