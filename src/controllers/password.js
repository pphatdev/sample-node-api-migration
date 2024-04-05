import Joi from "joi";
import { Response } from "../helpers/response-data.js";
import { isValidated } from "../helpers/validation.js";
import { updateData } from "../models/password.js";

const response      = new Response()
const validating    = new isValidated()

/**
 * កែប្រែលេខសម្ងាត់
 * @param {Object} ការស្នើបន្ថែម
 * @returns
 */
export const updatePassword = async (resquest) =>
{
    /**
     * កំណត់តម្រូវការទិន្នន័យរបស់អ្នកប្រើប្រាស់ថ្មី
     * @package Joi
     * @param {Required|String} name
     * @param {Required|String} email
     * @param {Required|String} password
     */
    const condition = validating.required(
        /**
         * កំណត់លក្ខខណ្ឌចាំបាច់
         */
        Joi.object({
            id: Joi.string().required(),
            oldPassword: Joi.string().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required(),
            newPassword: Joi.string().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required()
        }),

        /**
         * ទិន្នន័យដែលបានបោះតាមរយៈ Route
         */

        resquest
    )

    if (condition)
        /**
         * ករណីមានមិនទិន្នន័យមិនគ្រប់ បង្ហាញព័ត៌មានបរាជ័យ
         */
        return response.insetFailed({ message : condition.message })
    else
        /**
         * បង្ហាញព័ត៌មានដែលជោគជ័យ
         */
        return await updateData(resquest);
};


// export class PasswordController {
//     get = () => {
//         return "Hello World";
//     }
// }