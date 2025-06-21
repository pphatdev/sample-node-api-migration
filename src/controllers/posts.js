import Joi from "joi";
import { required } from "../helpers/validation.js";
import { getData, getDataDetail, insertData, updateData } from "../models/posts.js";
import { Response } from "../helpers/response-data.js";

const response      = new Response()

/**
 * get posts List
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


/**
 * show posts Detail
 * @param {Object} request
 * @returns
 */
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
 * Create new posts
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
            title: Joi.string().required(),
            slug: Joi.string().required(),
            description: Joi.string().required(),
            thumbnail: Joi.string().required(),
            tags: Joi.array().items(Joi.string()).required(),
            authors: Joi.string().required(),
            published: Joi.boolean().required(),
            content: Joi.string().required()
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
        return await insertData(request);
};


/**
 * Update posts
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