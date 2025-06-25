import fs from 'fs';

/**
 * Create File SQL [./migrations/sql/views/*.sql]
 * -----------------------------------------------
 * @param {String} filename
 * @param {String} viewName
 */
export const createViews = (filename, viewName) =>
{
    try {

        /**
         * Reading from template stubs
        */
        const stubs     = fs.readFileSync('./commands/stub/views.stub')
        const fromStubs = Buffer.from(stubs).toString()

        /**
         * Check if view name starts with number
        */
        if (/[0-9]$/.test(viewName.charAt(0))) {
            console.log(`\x1b[41m Index of view name can't be a number!\x1b[0m`)
            process.exit(0)
        }

        /**
         * Replacing view name in template stubs
        */
        const content   = fromStubs.replaceAll('[name]', viewName.replaceAll('-','_'))
        fs.writeFileSync(`./migrations/views/views_${filename.replaceAll('-','_')}.sql`, content);

    } catch (err) {

        console.error(err);
    }
    finally {
        console.log(`➡️  \x1b[30m[CREATED]:\x1b[32m view_${filename}.sql\x1b[0m`)
    }
}