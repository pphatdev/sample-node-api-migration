import bcryptjs from "bcryptjs";
const { hash, genSalt, compare } = bcryptjs;

import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";

class PasswordModel {
    static #response = new Response();
    static #pagination = new Pagination();

    static #validateSort(sort) {
        const allowedSortValues = ["name", "id", "password"];
        return allowedSortValues.includes(sort) ? sort : "name";
    }

    static async getData({ page, limit, search, sort }) {
        try {
            const count = await client.query(`SELECT count(id) from public.users`);
            const total = count.rows[0].count || 0;

            const query = PasswordModel.#pagination.query({
                table: 'public.users',
                selectColumns: ["id", "name", "password"],
                conditions: {
                    operator: 'WHERE',
                    value: ''
                },
                page,
                limit,
                search: {
                    column: ['name'],
                    value: search,
                    operator: "or",
                    withWere: true
                },
                sort: {
                    column: ["name"],
                    value: PasswordModel.#validateSort(sort)
                },
            });

            const result = await client.query(query, []);
            return {
                data: result.rows,
                count: total,
                show: result.rowCount
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getDataDetail({id}) {
        try {
            const result = await client.query(
                `SELECT id, name, password from public.users where id=$1`,
                [id]
            );
            return PasswordModel.#response.success(result.rows);
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
                return PasswordModel.#response.insetFailed({
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

            return PasswordModel.#response.insetSuccess({
                message: "Update Success."
            });
        } catch (error) {
            if (error.code === "23505") {
                return PasswordModel.#response.insetFailed({
                    message: error.detail
                });
            }
            console.error(error);
            throw error;
        }
    }
}

export default PasswordModel;