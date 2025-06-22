import { validationResult } from "express-validator";
import Joi from "joi";
import { Response } from "../response-data.js";

export class Controller {

    static async get(req, res, getList) {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            return res.status(422).json(
                Response.validateError(errors)
            );
        }
        res.send(
            await getList({
                limit: -1,
                sort: 'asc',
                page: 1,
                ...req.params,
                ...req.query,
            })
        )
    }


    static async getOnce(req, res, getDetail) {
        const query = { ...req.params, ...req.query }
        const schema = Joi.object({
            id: Joi.number().required()
        });

        const { error } = schema.validate(query);

        if (error) {
            return res.status(422).json(
                Response.validateError(error.details)
            );
        }
        res.send(await getDetail(query))
    }

}