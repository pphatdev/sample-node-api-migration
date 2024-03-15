import { client } from "../db/configs/pg.config";

export const getUsers = async (req, res, next) => {
    await client.connect()
    const result = await client.query("SELECT NOW()")
    return result
}