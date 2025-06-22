import { client } from "./configs/pg.config.js";

export const executeQuery = async (query, params = []) => {
    try {
        const result = await client.query(query, params);
        return { success: true, data: result };
    } catch (error) {
        console.error('Database query error:', error);
        return { success: false, error };
    }
};
