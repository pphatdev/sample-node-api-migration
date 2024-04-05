import Joi from "joi";
import { required } from "../helpers/validation.js";
import { getData, insetData, updateData } from "../models/users.js";
import { Response } from "../helpers/response-data.js";

const response      = new Response()

/**
 * បង្ហាញទិន្នន័យជាទិន្នន័យរួម (List) និង ទិន្នន័យលំហាត់ (Detail)
 * @param {Object} request
 * @returns
 */
export const get = async (request) =>
{
    let limit   = request.limit || 20;
    const { page, search, sort, id } = request;

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
        sort: sort,
        id: id,
    });

    if (!id)
        /**
         * បង្ហាញព័ត៌មានរបស់អ្នកប្រើប្រាស់ទាំងអស់តាមរយៈការកំណត់
         * { limit, page, search, sort }
        */
        return response.success(
            fetchData.data,
            fetchData.total
        );

    /**
     * បង្ហាញព័ត៌មានលម្អិតរបស់អ្នកប្រើប្រាស់តាមរយៈ {លម្អិត|id}
    */
    return response.success(
        fetchData.data
    );
};


/**
 * បង្កើតអ្នកប្រើប្រាស់ថ្មី
 * @param {Object} request
 * @returns
 */
export const create = async (request) =>
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
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required()
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
        return await insetData(request);
};


/**
 * កែប្រែអ្នកប្រើប្រាស់
 * @param {Object} request
 * @returns
 */
export const update = async (request, ...options) =>
{
    console.log(request);
    /**
     * កំណត់តម្រូវការទិន្នន័យរបស់អ្នកប្រើប្រាស់ថ្មី
     * @package Joi
     * @param {Required|String} id
     * @param {Required|String} name
     * @param {Required|String} email
     */
    const condition = required(
        /**
         * កំណត់លក្ខខណ្ឌចាំបាច់
         */
        Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
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
        return await updateData(request);
};