import fs from 'fs';

/**
 * Create Controller file
 * -----------------------------------------------
 * @param {String} filename
 */
export const createController = (filename) =>
{
    try {

        const oldFile   = fs.existsSync(`./src/controllers/${filename.replaceAll('_','-')}.js`)
        if (oldFile) {
            console.log(`\x1b[41m Controller file is already exist!\x1b[0m\n`)
            process.exit(0)
        }

        /**
         * Reading from template stubs
        */
        const stubs     = fs.readFileSync('./commands/stub/controller.stub')
        const fromStubs = Buffer.from(stubs).toString()

        if (/[0-9]$/.test(filename.replaceAll('_','-'))) {
            console.log(`\x1b[41m Index of controller name can't be a number!\x1b[0m`)
            process.exit(0)
        }

        const content   = fromStubs.replaceAll('[name]', filename.replaceAll('_','-'))
        fs.writeFileSync(`./src/controllers/${filename.replaceAll('_','-')}.js`, content);

    } catch (err) {

        console.error(err);
    }
    finally {
        console.log(`➡️  \x1b[30m[CREATED]:\x1b[32m ./src/controllers/${filename}.js\x1b[0m`)
    }
}