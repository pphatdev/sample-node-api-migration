import fs from 'fs';

/**
 * Create File SQL [./migrations/sql/create/*.sql]
 * -----------------------------------------------
 * @param {String} filename
 * @param {String} tableName
 */
export const createSQL = (filename, tableName) =>
{
    try {

        /**
         * Reading from template stubs
        */
        const stubs     = fs.readFileSync('./commands/stub/sql.stub')
        const fromStubs = Buffer.from(stubs).toString()

        /**
         * Check if table name starts with number
        */
        if (/[0-9]$/.test(tableName.charAt(0))) {
            console.log(`\x1b[41m Index of table name can't be a number!\x1b[0m`)
            process.exit(0)
        }

        /**
         * Replacing table name in template stubs
        */
        const content   = fromStubs.replaceAll('[name]', tableName.replaceAll('-','_'))
        fs.writeFileSync(`./migrations/sql/create_${filename.replaceAll('-','_')}`, content);

    } catch (err) {

        console.error(err);
    }
    finally {
        console.log(`➡️  \x1b[30m[CREATED]:\x1b[32m create_${filename}\x1b[0m`)
    }
}