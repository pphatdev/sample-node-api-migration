import bcryptjs from "bcryptjs";
const { hash, genSalt, compare } = bcryptjs

import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response.js";

const response = new Response()

export const updateData = async ( request ) =>
{
    const { id, oldPassword, newPassword } = request;
    const currentUser       = await client.query("select id, password from public.users where id = $1", [id]);
    const currentPassword   = currentUser.rows[0].password;
    const isMatch           = await compare(oldPassword, currentPassword);

    const passwordSalt      = await genSalt(10)
    const password          = await hash(newPassword, passwordSalt);

    if (!isMatch)
        return response.insetFailed({ message: "Old Password is not match." });

    return await client.query(
        `UPDATE public.users SET "password"=$1 WHERE id=$2;`,
        [password, id]
    ).then(
        result =>
        {
            if (result.rowCount < 0)
                return result
            return response.insetSuccess({ message: "Update Success." })
        }
    ).catch(
        reason =>
        {
            if (reason.code == "23505")
                return response.insetFailed({ message: reason.detail });

            console.log(reason)
            return reason
        }
    )
};