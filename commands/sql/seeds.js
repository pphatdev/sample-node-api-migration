import fs from "fs"
import { client } from "../../src/db/configs/pg.config.js";

export const seeds = () => {
    // Reading seeds files
    const files = fs.readdirSync('./migrations/seeds').map(file => { return file })

    // Starting message
    console.log(`♻️  Reading from ${files.length} seeds ${files.length > 1 ? "files" : 'file'}: [\x1b[35m./src/db/seeds/*.sql\x1b[0m\]`)
    files.map(async file => {
        const reading = fs.readFileSync('./migrations/seeds/' + file, 'utf8');
        const response = await client.query(reading)
        if (response.command) {
            console.log(`〽️ \x1b[30m[${response.command}]:\x1b[32m ${file}\x1b[0m`)
        }
        else {
            // Handle case where response might be an array of results
            const messages = Array.isArray(response) ? response : [response]
            console.log(`〽️ \x1b[30m[${messages[0].command ?? "EXAMPLE"}]:\x1b[32m ${file}\x1b[0m`)
        }
    });
}