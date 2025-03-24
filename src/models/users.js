import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";

const response  = new Response()
const PAGE      = new Pagination()

export const getData = async ( request ) =>
{
    const { page, limit, search, sort } = request
    const count = await client.query(`SELECT count(id) from public.users`)
    const total = count.rows[0].count || 0
    const query = PAGE.query({
        table: 'public.users',
        selectColumns: ["id", "name", "email", "created_at", "updated_at"],
        conditions: {
            operator: 'WHERE',
            value: ''
        },
        page: page,
        limit: limit,
        search: {
            column: [ 'name', 'email' ],
            value: search,
            operator: "or",
            withWere: true
        },
        sort: {
            column: [ "name", 'email'],
            value: sort
        },
    })

    return await client.query(query, []).then(
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


export const getDataDetail = async ( { id } ) =>
{
    return await client.query(
        `SELECT id, name, email, created_at, updated_at from public.users where id=$1`, [id]
    ).then(
        async result => {
            return response.success(
                result.rows
            );
        }
    ).catch(
        reason => console.log(reason)
    )
};


export const insetData = async ( request ) =>
{
    const { name, email, password } = request;

    return await client.query(
        `INSERT INTO users(name, email, password, created_at, updated_at) VALUES ($1, $2, $3, now(), now())`,
        [name, email, password ]
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