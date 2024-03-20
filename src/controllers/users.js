import { client } from "../db/configs/pg.config.js";
import { កំណត់ហេតុ } from "../helpers/debug.js";
import { ការឆ្លើយតប } from "../helpers/response.js";

const response = new ការឆ្លើយតប()
await client.connect()

export const អ្នកប្រើប្រាស់ទាំងអស់ = async () => {

    return await client.query(
        `SELECT
            id,
            name,
            email,
            created_at,
            updated_at
        from users`
    )
    .then(
        ចម្លើយ => {

            // កំណត់ហេតុ(ចម្លើយ.rows, ចម្លើយ.rowCount) ;
            const ទិន្នន័យ = ចម្លើយ.rows ;
            return response.ជោកជ័យ(
                ទិន្នន័យ,
                ចម្លើយ.rowCount
            )
        }
    ).catch(
        មូលហេតុ => កំណត់ហេតុ(មូលហេតុ)
    )
};
