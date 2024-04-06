import moment from "moment";
import { createSQL } from "../sql/create.js";
import { migrate } from "../sql/migrate.js";

const commands      = process.argv
const commandLength = process.argv.length;
const dateFormat    = moment().format('DDMMYYYY_HHmmss');
const extension     = '.sql';


if (commandLength < 3) {
    console.log('Usage: node test.js <test-name>');
}


if (commandLength >= 3) {

    /**
     * Remove Directory file from array
    */
    const options = commands.slice(1, commandLength).slice(1, commands.length)

    /**
     * Remove option from array,
     * Keep on names
    */
    const sqlNames = options.slice(1, options.length)

    if ((options[0]) === '--create') {

        sqlNames.forEach( name => {
            const filename = `${name}_${dateFormat}${extension}`
            createSQL(filename, name)
        })

        new Promise(resolve => setTimeout(resolve, 100)).then(() => {
            console.log(`\n✅🌈 You have created SQL: ${sqlNames}!\n`)
            process.exit(0)
        })
    }

    if ((options[0]) === '--migrate') {
        migrate()

        new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
            console.log(`✅🌈  Migration completed!\n`)
            process.exit(0)
        })
    }
}
