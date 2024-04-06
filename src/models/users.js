import bcryptjs from "bcryptjs";
import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";

const { hash, genSalt } = bcryptjs
const response  = new Response()
const PAGE      = new Pagination()


export const getData = async ( request ) =>
{
    const { page, limit, search, sort, id } = request
    const count         = await client.query(`SELECT count(id) from public.users`)
    const total         = count.rowCount || 0
    const pagination    = PAGE.list({
        page: page,
        limit: limit,
        search: {
            column: [ 'name' ],
            value: search,
            condition: "or"
        },
        sort: {
            column: [ "name" ],
            value: sort
        },
    })

    return await client.query(
        `SELECT id, name, email, created_at, updated_at from public.users ${ id ? `where id = ${id}` : pagination } `
    ).then(
        async result => {
            const data = {
                data: result.rows,
                count: total,
                show: result.rowCount
            }
            return data
        }
    ).catch(
        reason => console.log(reason)
    )
};


export const insetData = async ( request ) =>
{
    const { name, email, password } = request;
    const passwordSalt      = await genSalt(10)
    const passwordGenerated = await hash(password, passwordSalt);

    return await client.query(
        `INSERT INTO users(name, email, password, created_at, updated_at) VALUES ($1, $2, $3, now(), now())`,
        [name, email, passwordGenerated]
    ).then(
        result => {

            if (result.rowCount < 0)
                return result

            return response.insetSuccess({ message: "Insert Success." })
        }
    ).catch(
        reason => {

            if (reason.code == "23505")
                return response.insetFailed({ message: reason.detail });

            console.log(reason)
            return reason
        }
    )
};


export const updateData = async ( request ) =>
{
    const { id, name, email } = request;
    return await client.query(
        `UPDATE public.users SET "name"=$1, email=$2, updated_at=$3 WHERE id=$4;`,
        [name, email, "now()", id]
    ).then(
        result => {

            if (result.rowCount < 0)
                return result

            return response.insetSuccess({ message: "Update Success." })
        }
    ).catch(
        reason => {

            if (reason.code == "23505")
                return response.insetFailed({ message: reason.detail });

            console.log(reason)
            return reason
        }
    )
};