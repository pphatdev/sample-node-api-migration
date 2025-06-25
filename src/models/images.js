import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { query as pagination } from "../helpers/paginations.js";
import { FileCache } from "../helpers/utils/caches/files.js";
import { paramsToNameFile } from "../helpers/utils/convertion/string.js";

class ImageModel {

    static cache = new FileCache({
        cacheDir: '.cache-local/images',
        ttl: Infinity // Cache will not expire
    });

    static async getData(request) {

        const { page, limit, search, sort } = request

        const cacheKey = `list_${paramsToNameFile(request)}`;
        const cachedData = await ImageModel.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const count = await client.query(`SELECT count(id) from public.files`);
        const total = count.rows[0].count || 0;

        const query = pagination({
            table: 'public.files',
            selectColumns: ["id", "filename", "original_name", "mime_type", "size", "path", "created_by", "is_public", "created_date"],
            page,
            limit,
            search: {
                column: ["original_name", "filename"],
                value: search,
                operator: "or",
                withWere: true
            },
            sort: {
                column: [],
                value: sort
            },
        });

        try {
            const result = await client.query(query, []);
            const responseData = Response.success(result.rows, Number(total));
            await ImageModel.cache.set(cacheKey, responseData);
            return responseData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async insertData({ id, filename, original_name, mime_type, size, path }) {
        try {
            const result = await client.query(
                `INSERT INTO public.files(
                    id, filename, original_name, mime_type, size, path,
                    created_by, is_public, status, is_deleted, created_date
                ) VALUES ($1, $2, $3, $4, $5, $6, 1, true, true, false, CURRENT_TIMESTAMP)
                RETURNING id`,
                [id, filename, original_name, mime_type, size, path]
            );

            if (result.rowCount < 0) return result;

            await ImageModel.cache.clear();
            return Response.insetSuccess({
                id: result.rows[0].id,
                message: "Image uploaded successfully.",
                filename,
                original_name,
                mime_type,
                size,
                path
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getDataDetail({id}) {
        const cacheKey = `detail_${id}`;
        const cachedData = await ImageModel.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        try {
            const result = await client.query(
                `SELECT * from public.files where id=$1`,
                [id]
            );

            const responseData = result.rowCount > 0
                ? Response.detailSuccess(result.rows)
                : Response.notFound({ message: "Data not found." });
                await ImageModel.cache.set(cacheKey, responseData);
            return responseData;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async clearCache() {
        try {
            await ImageModel.cache.clear();
            return Response.success(null, 0, "Cache cleared successfully.");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const { getData, insertData, getDataDetail, clearCache } = ImageModel;

export default ImageModel;