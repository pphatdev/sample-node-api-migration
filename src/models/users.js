import { client } from "../db/configs/pg.config.js";
import { កំណត់ហេតុ } from "../helpers/debug.js";

await client.connect()

export const ទិន្នន័យអ្នកប្រើប្រាស់ទាំងអស់ = async ( options ) =>
{
    const {
        ទំព័រ,
        ច្រើនបំផុត,
        ស្វែងរក,
        តម្រៀបតាម,
        លម្អិត
    } = options

    const ចំនួន = await client.query(`SELECT count(id) from users`)
    const ចំនួនទិន្នន័យ = await ចំនួន.rows[0].count || 0

    return await client.query(
        `SELECT
            id,
            name,
            email,
            created_at,
            updated_at
        from users
            ${
                !លម្អិត
                ? ` ${ស្វែងរក ? ` where name ilike '%${ស្វែងរក}%' `: ""}
                    ${តម្រៀបតាម ? ` order by name ${តម្រៀបតាម} `: ""}
                    ${ច្រើនបំផុត ? ` limit ${ច្រើនបំផុត} `: ""}
                    ${ទំព័រ? ` offset ${(ទំព័រ - 1) * ច្រើនបំផុត} `: ""}`
                :` where id = ${លម្អិត}`
            }
        `
    ).then(
        ចម្លើយ => {
            const ទិន្នន័យរួម = {
                ទិន្នន័យ: ចម្លើយ.rows,
                ចំនួន: ចំនួនទិន្នន័យ,
                បង្ហាញ: ចម្លើយ.rowCount
            }
            return ទិន្នន័យរួម
        }
    ).catch(
        មូលហេតុ => កំណត់ហេតុ(មូលហេតុ)
    )
};