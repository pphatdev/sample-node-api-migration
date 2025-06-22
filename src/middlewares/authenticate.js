import jwt from "jsonwebtoken";
import { Response } from "../helpers/response-data.js";
import { APP_SECRET_KEY } from "../db/configs/index.js";

const { verify }    = jwt;

export const authenticateToken = (req, res, next) =>
{
    /**
     * Get Auth bearer token
    */
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    /**
     * ករណីគ្មាន Token
    */
    if (!token)
        return res.send(Response.unAuth({ message : "Unauthorized." }));

    /**
     * Verify Token
    */
    verify( token, APP_SECRET_KEY, (err, decoded) => {
        if (err)
            return res.send(Response.invalidToken({ message : "Token is invalid." }));

        req.user = decoded;
        next();
    });
}