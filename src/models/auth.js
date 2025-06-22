import bcryptjs  from "bcryptjs";
import jwt from "jsonwebtoken";
import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { APP_SECRET_KEY, LOGIN_EXP } from "../db/configs/index.js";
import { randomUUID } from 'crypto';
import moment from "moment";

const { sign }      = jwt;
const { compare }   = bcryptjs

export const authLogin = async ( request ) =>
{
    const { email, password } = request;
    const currentUser   = await client.query(
        "select id, email, password from public.users where email = $1",
        [email]
    );


    /**
     * ករណីគ្មាន email មិនត្រឹមត្រូវ
    */
    if (currentUser.rowCount <= 0)
        return Response.authClient({ message: "Wrong Email." });

    /**
     * ប្រៀបធៀបពាក្យសំងាត់ រវាង Database និង ពាក្យសំងាត់ដែលបានបញ្ចូល
    */
    const userId            = currentUser.rows[0].id;
    const passwordFromDB    = currentUser.rows[0].password;
    const isPasswordMatch   = await compare(password, passwordFromDB);

    /**
     * ករណីគ្មាន password មិនត្រឹមត្រូវ
    */
    if (!isPasswordMatch)
        return Response.authClient({ message: "Wrong Password." });

    /**
     * Create Auth bearer Token
     */
    const id        = randomUUID();
    const token     = sign({ userId }, APP_SECRET_KEY, { expiresIn: moment(LOGIN_EXP).diff() });


    return await client.query(
        `INSERT INTO public.oauth_access_tokens
            (id, user_id, client_id, "name", scopes, revoked, created_at, updated_at, expires_at)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
        [id, userId, userId, "Personal Access Token", null, false, new Date(), new Date(), LOGIN_EXP]
    ).then(
        result => {

            if (result.rowCount < 0)
                return result

            return Response.authSuccess({
                userId: userId,
                clientId: id,
                createdAt: moment().format('DD-MM-YYYY HH:mm:ss A'),
                tokenType: `Bearer`,
                token: `${token}`,
                tokenFull: `Bearer ${token}`,
                expireDate: moment(LOGIN_EXP).format('DD-MM-YYYY HH:mm:ss A')
            });
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