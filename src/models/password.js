import bcryptjs from "bcryptjs";
const { hash, genSalt, compare } = bcryptjs;

import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";
import { executeQuery } from "../db/query.js";

const PAGE = new Pagination()

class PasswordModel {
    static #pagination = new Pagination();

    static async getData(request) {
        try {
            let limit = request.limit || 20;
            const { page, search, sort } = request
            const allowedSortColumns = ["id", "name", "created_at"]; // Whitelist of allowed columns
            const validatedSort = allowedSortColumns.includes(sort) ? sort : "id"; // Default to "id" if invalid

            if (!Number(limit))
                limit = null

            const countResult = await executeQuery(`SELECT count(id) from public.users`);

            const total = countResult.data.rows[0].count || 0
            const query = PAGE.query({
                table: 'public.users',
                selectColumns: ["*"],
                conditions: { operator: 'WHERE', value: '' },
                page: page,
                limit: limit,
                search: {
                    column: [],
                    value: search,
                    operator: "or",
                    withWere: true
                },
                sort: {
                    // column: ["id"],
                    value: validatedSort
                },
            })

            const result = await executeQuery(query, []);

            return Response.success(
                result.data.rows,
                total
            );

        } catch (error) {
            console.error('Error in getData:', error);
            return Response.serverError({ message: 'Failed to retrieve posts' });
        }
    }

    static async getDataDetail({ id }) {
        try {
            const result = await client.query(
                `SELECT id, name, password from public.users where id=$1`,
                [id]
            );
            return Response.detailSuccess(result.rows);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateData({ id, oldPassword, newPassword }) {
        try {
            const currentUser = await client.query(
                "select id, password from public.users where id = $1",
                [id]
            );

            const currentPassword = currentUser.rows[0].password;
            const isMatch = await compare(oldPassword, currentPassword);

            if (!isMatch) {
                return Response.insetFailed({
                    message: "Old Password is not match."
                });
            }

            const passwordSalt = await genSalt(10);
            const password = await hash(newPassword, passwordSalt);

            const result = await client.query(
                `UPDATE public.users SET "password"=$1 WHERE id=$2;`,
                [password, id]
            );

            if (result.rowCount < 0) {
                return result;
            }

            return Response.insetSuccess({
                message: "Update Success."
            });
        } catch (error) {
            if (error.code === "23505") {
                return Response.insetFailed({
                    message: error.detail
                });
            }
            console.error(error);
            throw error;
        }
    }
}

export default PasswordModel;