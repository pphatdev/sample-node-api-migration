import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";
import ip from "ip";
import ImageModel from "./images.js";
import { PORT, VERSION } from "../db/configs/index.js";
import { FileCache } from "../helpers/utils/caches/files.js";
import { paramsToNameFile } from "../helpers/utils/convertion/string.js";

const PAGE = new Pagination()

// Initialize cache with 15 minutes TTL for projects data
const cache = new FileCache({
    cacheDir: '.cache-local/projects',
    ttl: 900 // 15 minutes
});

export const getData = async (request) => {

    const { page, limit, search, sort, published } = request

    // Create cache key based on request parameters
    const cacheKey = `projects_list_${paramsToNameFile(request)}`;

    // Try to get data from cache first
    const cachedData = await cache.get(cacheKey)
    if (cachedData) {
        console.log('Returning cached projects data')
        return cachedData
    }

    const count = await client.query(`SELECT count(id) from public.projects`)
    const total = count.rows[0].count || 0

    const query = PAGE.query({
        table: 'public.projects',
        selectColumns: [
            "id",
            "name",
            "description",
            "image",
            "published",
            "tags",
            "source::json as source",
            "authors::json as authors",
            "languages",
            "created_date", "updated_date"
        ],
        conditions: { operator: 'WHERE', value: `published = ${published ?? 'true'}` },
        page: page,
        limit: limit,
        search: {
            column: ["name", "description"],
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
        async result => {
            const responseData = Response.success(result.rows, total)
            // Cache the successful response
            await cache.set(cacheKey, responseData)
            console.log('Cached projects data')
            return responseData
        }
    ).catch(
        reason => console.log(reason)
    )
};


export const getDataDetail = async ({ id }) => {
    const cacheKey = `project_detail_${id}`
    const cachedData = await cache.get(cacheKey)
    if (cachedData) {
        console.log(`Returning cached project detail for ID: ${id}`)
        return cachedData
    }

    return await client.query(
        `SELECT * from public.projects where id=$1`, [id]
    ).then(
        async result => {
            const responseData = Response.detailSuccess(result.rows)
            await cache.set(cacheKey, responseData)
            console.log(`Cached project detail for ID: ${id}`)
            return responseData
        }
    ).catch(
        reason => console.log(reason)
    )
};


export const insertData = async (request) => {

    const fileData = {
        id: (request.file.filename).split('.')[0],
        filename: request.file.filename,
        original_name: request.file.originalname,
        mime_type: request.file.mimetype,
        size: request.file.size,
        path: `/images/projects/${request.file.filename}`
    }

    request.body.image = fileData.path;

    const { status } = await ImageModel.insertData(fileData)

    if (status !== 200) {
        res.status(status).json(Response.insetFailed({ message: "Failed to insert image data." }));
    }

    const { image, title, description, published, tags, source, authors, languages } = request.body;

    const query = `
        INSERT INTO public.projects(
            name, description, image, published, tags, source, authors, languages
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id;
    `;

    const values = [
        title,
        description,
        image,
        published,
        tags ? (tags) : null,
        source ? JSON.stringify(source) : null,
        authors ? JSON.stringify(authors) : null,
        languages ? (languages) : null
    ];

    return await client.query(query, values).then(
        async result => {
            if (result.rowCount > 0) {
                await clearProjectsCache()
                console.log('Cleared projects cache due to new project creation')

                return Response.insetSuccess({
                    id: result.rows[0].id,
                    message: "Project created successfully.",
                });
            }
            return Response.insetFailed({ message: "Failed to create project." });
        }
    ).catch(
        reason => {
            console.log(reason);
            return Response.insetFailed({ message: reason.message || "Failed to create project." });
        }
    );
};


export const updateData = async (request) => {
    return Response.serverError({
        message: "Cooking! Coming soon...",
        data: request.body
    })
};

export const clearCache = async () => {
    try {
        await cache.clear();
        console.log('Projects cache cleared successfully');
        return Response.success(null, 0, "Cache cleared successfully.");
    } catch (error) {
        console.error('Error clearing projects cache:', error);
        return Response.serverError({ message: "Failed to clear cache." });
    }
}

export const getCacheStats = async () => {
    try {
        return {
            cacheDir: cache.cacheDir,
            ttl: cache.ttl
        }
    } catch (error) {
        console.error('Error getting cache stats:', error)
        return null
    }
}