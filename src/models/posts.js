import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";

const response = new Response()
const PAGE = new Pagination()

export const getData = async (request) => {
    const { page, limit, search, sort } = request
    const count = await client.query(`SELECT count(id) from public.posts`)
    const total = count.rows[0].count || 0
    const query = PAGE.query({
        table: 'public.posts',
        selectColumns: ["*"],
        conditions: {
            operator: 'WHERE',
            value: ''
        },
        page: page,
        limit: limit,
        search: {
            column: [],
            value: search,
            operator: "or",
            withWere: true
        },
        sort: {
            column: [],
            value: sort
        },
    })

    return await client.query(query, []).then(
        result => {
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


export const getDataDetail = async ({ id }) => {
    return await client.query(
        `SELECT * from public.posts where id=$1`, [id]
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


export const insertData = async (request) => {
    const { title, slug, description, thumbnail, tags, authors, published, content } = request

    return await client.query(
        `INSERT INTO public.posts (title, slug, description, thumbnail, tags, authors, published)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
        [title, slug, description, thumbnail, tags, authors, published]
    ).then(
        async result => {

            console.log(result);
            

            if (result.rowCount <= 0)
                return result

            // If content is provided, insert into post_contents
            if (request.content) {
                try {
                    const postId = result.rows[0].id;
                    await client.query(
                        `INSERT INTO public.post_contents (parent_id, content)
                        VALUES ($1, $2);`,
                        [postId, request.content]
                    );
                } catch (contentError) {
                    console.log(contentError);
                    // Optionally handle content insertion error
                }
            }

            return response.insetSuccess({
                message: "Post created successfully.",
                id: result.rows[0].id
            })
        }
    ).catch(
        reason => {
            if (reason.code === "23505")
                return response.insetFailed({ message: reason.detail });

            console.log(reason)
            return reason
        }
    )
};

export const updateData = async (request) => {
    return await client.query(
        `UPDATE public.posts SET "name"=$1 WHERE id=$2;`,
        [name, id]
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