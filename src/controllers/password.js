import Joi from "joi";
import { Response } from "../helpers/response-data.js";
import { required } from "../helpers/validation.js";
import { updateData, getData, getDataDetail } from "../models/password.js";

const response      = new Response()

/**
 * បង្ហាញទិន្នន័យជាទិន្នន័យរួម (List) និង ទិន្នន័យលំហាត់ (Detail)
 * @param {Object} request
 * @returns
 */
export const get = async (request) =>
{
    let limit   = request.limit || 20;
    const { page, search, sort } = request;

    if (!Number(limit))
        limit = null

    /**
     * ទាញព័ត៌មានរបស់អ្នកប្រើប្រាស់ទាំងអស់តាមរយៈការកំណត់
     * { limit, page, search, sort }
    */
    const fetchData = await getData({
        page: page,
        limit: limit,
        search: search,
        sort: sort
    });

    return response.success(
        fetchData.data,
        fetchData.count
    );
};


export const getOnce = async (request) =>
{
    /**
     * កំណត់តម្រូវការទិន្នន័យរបស់អ្នកប្រើប្រាស់ថ្មី
     * @package Joi
     * @param {Required|Number} id
     */
    const condition = required(
        /**
         * កំណត់លក្ខខណ្ឌចាំបាច់
         */
        Joi.object({
            id: Joi.number().required()
        }),

        /**
         * ទិន្នន័យដែលបានបោះតាមរយៈ Route
         */
        request
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
        return await getDataDetail(request);
};

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
    const condition = required(
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

