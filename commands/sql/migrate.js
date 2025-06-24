import fs from "fs"
import { client } from "../../src/db/configs/pg.config.js";

export const migrate = () => {
    // Reading migrations files
    const files = fs.readdirSync('./migrations/sql').map( file => { return file })

    // Starting message
    console.log(`♻️  Reading from ${files.length} migrations ${files.length > 1 ? "files" : 'file'}: [\x1b[35m./src/db/sql/db/*.sql\x1b[0m\]`)

    files.map(async file => {
        const reading   = fs.readFileSync('./migrations/sql/' + file, 'utf8');
        const response  = await client.query(reading)
        if (response.command) {
            console.log(`〽️ \x1b[30m[${response.command}]:\x1b[32m ${file}\x1b[0m`)
        }
        else {
            // Handle case where response might be an array of results
            const messages = Array.isArray(response) ? response : [response]
            console.log(`〽️ \x1b[30m[${messages[0].command}]:\x1b[32m ${file}\x1b[0m`)
        }
    });
}


export const views = () => {
    // Reading views files
    const files = fs.readdirSync('./migrations/views').map( file => { return file })

    // Starting message
    console.log(`♻️  Reading from ${files.length} views ${files.length > 1 ? "files" : 'file'}: [\x1b[35m./src/db/views/*.sql\x1b[0m\]`)

    files.map(async file => {
        const reading   = fs.readFileSync('./migrations/views/' + file, 'utf8');
        const response  = await client.query(reading)
        if (response.command) {
            console.log(`〽️ \x1b[30m[${response.command}]:\x1b[32m ${file}\x1b[0m`)
        }
        else {
            // Handle case where response might be an array of results
            const messages = Array.isArray(response) ? response : [response]
            console.log(`〽️ \x1b[30m[${messages[0].command}]:\x1b[32m ${file}\x1b[0m`)
        }
    });
}

export const procedures = () => {
    // Reading functions files
    const files = fs.readdirSync('./migrations/functions').map( file => { return file })

    // Starting message
    console.log(`♻️  Reading from ${files.length} functions ${files.length > 1 ? "files" : 'file'}: [\x1b[35m./src/db/functions/*.sql\x1b[0m\]\n`)

    files.map(async file => {
        const reading   = fs.readFileSync('./migrations/functions/' + file, 'utf8');
        const response  = await client.query(reading)
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