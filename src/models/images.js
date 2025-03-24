import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";

const response = new Response()
const PAGE = new Pagination()

export const getData = async (request) => {
    const { page, limit, search, sort } = request
    const count = await client.query(`SELECT count(id) from public.files`)
    const total = count.rows[0].count || 0

    const query = PAGE.query({
        table: 'public.files',
        selectColumns: ["id", "filename", "original_name", "mime_type", "size", "path", "created_by", "is_public", "created_date"],
        conditions: {
            operator: 'WHERE',
            value: ''
        },
        page: page,
        limit: limit,
        search: {
            column: ["original_name", "filename"],
            value: search,
            operator: "or",
            withWere: true
        },
        sort: {
            column: ['id', 'original_name'],
            value: sort
        },
    })

    return await client.query(query, []).then(
        result => {
            return response.success(result.rows, Number(total));
        }
    ).catch(
        reason => console.log(reason)
    )
};


export const insetData = async (request) => {
    const { id, filename, original_name, mime_type, size, path } = request

    return await client.query(
        `INSERT INTO public.files(
            id,
            filename,
            original_name,
            mime_type,
            size,
            path,
            created_by,
            is_public,
            status,
            is_deleted,
            created_date
        ) VALUES ($1, $2, $3, $4, $5, $6, 1, true, true, false, CURRENT_TIMESTAMP) RETURNING id`,
        [
            id,
            filename,
            original_name,
            mime_type,
            size,
            path
        ]
    ).then(
        async result => {
            if (result.rowCount < 0)
                return result
            return response.insetSuccess({
                id: result.rows[0].id,
                message: "Image uploaded successfully.",
                ...request,
            });
        }
    ).catch(
        reason => {
            console.log(reason)
            return reason
        }
    )
};


export const getDataDetail = async ({ id }) => {
    return await client.query(`SELECT * from public.files where id=$1`, [id]).then(
        async result => {
            return response.success(result.rows, 1);
        }
    ).catch(
        reason => console.log(reason)
    )
};
