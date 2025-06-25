import fs from 'fs';

/**
 * Create Route file
 * -----------------------------------------------
 * @param {String} filename
 */
export const createRoutes = (filename) =>
{
    try {

        const oldFile   = fs.existsSync(`./src/routes/${filename.replaceAll('_','-')}.js`)
        if (oldFile) {
            return console.log(`\x1b[41m Route file is already exist!\x1b[0m\n`)
            // process.exit(0)
        }

        /**
         * Reading from template stubs
        */
        const stubs     = fs.readFileSync('./commands/stub/route.stub')
        const fromStubs = Buffer.from(stubs).toString()

        if (/[0-9]$/.test(filename.replaceAll('_','-'))) {
            return console.log(`\x1b[41m Index of Route name can't be a number!\x1b[0m`)
            // process.exit(0)
        }

        const content   = fromStubs.replaceAll('[name]', filename.replaceAll('_','-'))
        return fs.writeFileSync(`./src/routes/${filename.replaceAll('_','-')}.js`, content);

    } catch (err) {

        console.error(err);
    }
    finally {
        console.log(`➡️  \x1b[30m[CREATED]:\x1b[32m ./src/routes/routes/${filename}.js\x1b[0m`)
    }
}