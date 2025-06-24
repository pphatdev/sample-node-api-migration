import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";
import { FileCache } from "../helpers/utils/caches/files.js";


const PAGE = new Pagination();
const cache = new FileCache({
    cacheDir: '.cache-local/users',
    ttl: 3600 // 1 hour
});

export const getData = async (request) => {
    const { page, limit, search, sort } = request;

    // Create cache key from request parameters
    const cacheKey = `list_${page}_${limit}_${search}_${sort}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) { return cachedData; }

    const count = await client.query(`SELECT count(id) from public.users`);
    const total = count.rows[0].count || 0;

    // List of allowed columns for sorting
    const allowedSortColumns = ["name", "email"];
    const sortColumn = allowedSortColumns.includes(sort) ? sort : "name";

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
            column: ['name', 'email'],
            value: search,
            operator: "or",
            withWere: true
        },
        sort: { column: ["name", 'email'], value: sort || 'ASC' },
    });

    const raw = query.replace('?', sortColumn);

    return await client.query(raw, []).then(
        async result => {
            const data = {
                data: result.rows,
                count: total,
                show: result.rowCount
            };

            await cache.set(cacheKey, data);

            return Response.success(
                data.data,
                data.show
            );
        }
    ).catch(reason => console.log(reason));
};

export const getDataDetail = async (id) => {
    const cacheKey = `detail_${id}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    return await client.query(
        `SELECT id, name, email, created_at, updated_at from public.users where id=$1`, [id]
    ).then(
        async result => {
            const responseData = Response.success(result.rows);
            await cache.set(cacheKey, responseData);
            return responseData;
        }
    ).catch(reason => console.log(reason));
};

export const insertData = async (request) => {
    const { name, email, password } = request;

    return await client.query(
        `INSERT INTO users(name, email, password, created_at, updated_at) VALUES ($1, $2, $3, now(), now())`,
        [name, email, password]
    ).then(
        result => {

            if (result.rowCount < 0)
                return result

            return Response.insetSuccess({ message: "Insert Success." })
        }
    ).catch(
        reason => {

            if (reason.code == "23505")
                return Response.insetFailed({ message: reason.detail });

            console.log(reason)
            return reason
        }
    )
};

export const updateData = async (request) => {
    const { id, name, email } = request;
    return await client.query(
        `UPDATE public.users SET "name"=$1, email=$2, updated_at=$3 WHERE id=$4;`,
        [name, email, "now()", id]
    ).then(
        async result => {
            if (result.rowCount < 0)
                return result;

            // Clear cache after update
            await cache.clear();
            return Response.insetSuccess({ message: "Update Success." });
        }
    ).catch(
        reason => {

            if (reason.code == "23505")
                return Response.insetFailed({ message: reason.detail });

            console.log(reason)
            return reason
        }
    );
};