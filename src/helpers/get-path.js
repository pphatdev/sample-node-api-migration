//requiring path and fs modules
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
const __filename        = fileURLToPath(import.meta.url);
const __dirname         = path.dirname(__filename);


/**
 * Get file name from route web
 * @returns
 */
export const getRouteWeb = () => {

    const directoryPath = path.join(__dirname, '../routes/web');
    return fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        String(files).replace(/\.?js$/, '')
        return files
    });
}
