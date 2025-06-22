import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";
import { FileCache } from "../helpers/utils/caches/files.js";
import { required } from "../helpers/validation.js";
import { executeQuery } from "../db/query.js";
import Joi from "joi";

const PAGE = new Pagination()

const cache = new FileCache({
    cacheDir: '.cache-local/posts',
    ttl: 3600 // 1 hour
});

export const getData = async (request) => {
    try {
        let limit = request.limit || 20;
        const { page, search, sort } = request

        if (!Number(limit))
            limit = null

        const countResult = await executeQuery(`SELECT count(id) from public.posts`);
        if (!countResult.success) {
            throw new Error('Failed to get post count');
        }

        const total = countResult.data.rows[0].count || 0
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

        const result = await executeQuery(query, []);
        if (!result.success) {
            throw new Error('Failed to get posts data');
        }

        return Response.success(
            result.data.rows,
            total
        );

    } catch (error) {
        console.error('Error in getData:', error);
        return Response.error({ message: 'Failed to retrieve posts' });
    }
};

export const getDataDetail = async ({ id }) => {
    try {
        const cacheKey = `detail_${id}`;
        const cachedData = await cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const result = await executeQuery(`SELECT * FROM public.get_posts WHERE id = $1`, [id]);
        if (!result.success) {
            throw new Error('Failed to get post detail');
        }

        if (result.data.rows.length === 0) {
            return Response.notFound({ message: 'Post not found' });
        }

        const responseData = Response.success(result.data.rows);
        await cache.set(cacheKey, responseData);

        return responseData;

    } catch (error) {
        console.warn('Error in getDataDetail:', error);
        return Response.failed({ message: 'Failed to retrieve post detail' });
    }
};

export const insertData = async (request) => {

    const condition = required(
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
        request
    )

    if (condition)
        return Response.insetFailed({ message: condition.message })

    try {
        const { title, slug, description, thumbnail, tags, authors, published, content } = request;

        // Check if slug already exists
        const slugCheck = await executeQuery(
            `SELECT id FROM public.posts WHERE slug = $1 AND is_deleted = false`,
            [slug]
        );

        if (slugCheck.success && slugCheck.data.rows.length > 0) {
            return Response.insetFailed({ message: 'Slug already exists. Please use a different slug.' });
        }

        const result = await executeQuery(
            `INSERT INTO public.posts (title, slug, description, thumbnail, tags, authors, published)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
            [title, slug, description, thumbnail, tags, authors, published]
        );

        if (!result.success) {
            if (result.error.code === "23505") {
                return Response.insetFailed({ message: 'Slug already exists. Please use a different slug.' });
            }
            throw result.error;
        }

        if (result.data.rowCount <= 0) {
            return Response.insetFailed({ message: 'Failed to insert post' });
        }

        // Handle content insertion if provided
        if (content) {
            try {
                const postId = result.data.rows[0].id;
                const contentResult = await executeQuery(
                    `INSERT INTO public.post_contents (parent_id, content)
                    VALUES ($1, $2);`,
                    [postId, JSON.stringify(content)]
                );

                if (!contentResult.success) {
                    console.error('Content insertion failed:', contentResult.error);
                    // Continue without failing the main operation
                }
            } catch (contentError) {
                console.error('Content insertion error:', contentError);
                // Continue without failing the main operation
            }
        }

        return Response.insetSuccess({
            message: "Post created successfully.",
            id: result.data.rows[0].id
        });
    } catch (error) {
        console.error('Error in insertData:', error);
        return Response.insetFailed({ message: 'Failed to create post' });
    }
};

export const updateData = async (request) => {

    const condition = required(
        Joi.object({
            id: Joi.string().uuid().required(),
            title: Joi.string().required(),
            slug: Joi.string().required(),
            description: Joi.string().required(),
            thumbnail: Joi.string().required(),
            tags: Joi.array().items(Joi.string()).required(),
            authors: Joi.string().required(),
            published: Joi.boolean().required(),
            content: Joi.string().required()
        }),
        request
    )

    if (condition)
        return Response.insetFailed({ message: condition.message })

    try {
        const { id, title, slug, description, thumbnail, tags, authors, published } = request;

        const result = await executeQuery(
            `UPDATE public.posts SET title=$1, slug=$2, description=$3, thumbnail=$4, tags=$5, authors=$6, published=$7 WHERE id=$8;`,
            [title, slug, description, thumbnail, tags, authors, published, id]
        );

        if (!result.success) {
            if (result.error.code === "23505") {
                return Response.insetFailed({ message: result.error.detail });
            }
            throw result.error;
        }

        if (result.data.rowCount <= 0) {
            return Response.insetFailed({ message: 'Post not found or no changes made' });
        }

        return Response.insetSuccess({ message: "Update Success." });
    } catch (error) {
        console.error('Error in updateData:', error);
        return Response.insetFailed({ message: 'Failed to update post' });
    }
};