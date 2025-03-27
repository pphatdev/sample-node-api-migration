import fs from 'fs-extra';
import path from 'path';
import { FileCache } from './files.js';

export class ImageCache extends FileCache {
    constructor(options = {}) {
        super({
            ...options,
            cacheDir: options.cacheDir || '.cache-local/images'
        });
    }

    getCacheFilePath(key, extension) {
        const filePath = path.resolve(this.cacheDir, `${key}${extension}`);
        if (!filePath.startsWith(path.resolve(this.cacheDir))) {
            throw new Error('Invalid file path');
        }
        return filePath;
    }

    async saveImage(key, imageBuffer, extension) {
        try {
            const filePath = this.getCacheFilePath(key, extension);
            const metadata = {
                timestamp: Date.now(),
                ttl: this.ttl,
                extension
            };

            // Save the image
            await fs.writeFile(filePath, imageBuffer);

            // Save metadata separately
            await fs.writeJson(this.getCacheFilePath(key, '.meta.json'), metadata);

            return true;
        } catch (error) {
            console.error('Error saving image:', error);
            return false;
        }
    }

    async getImage(key, extension) {
        try {
            const metaPath = this.getCacheFilePath(key, '.meta.json');
            if (!fs.existsSync(metaPath)) return null;

            const metadata = await fs.readJson(metaPath);
            const age = (Date.now() - metadata.timestamp) / 1000;

            if (age > metadata.ttl) {
                await this.deleteImage(key, metadata.extension);
                return null;
            }

            const imagePath = this.getCacheFilePath(key, extension || metadata.extension);
            if (!fs.existsSync(imagePath)) return null;

            return await fs.readFile(imagePath);
        } catch (error) {
            console.error('Error reading image:', error);
            return null;
        }
    }

    async deleteImage(key, extension) {
        try {
            const metaPath = this.getCacheFilePath(key, '.meta.json');
            if (fs.existsSync(metaPath)) {
                const metadata = await fs.readJson(metaPath);
                const imagePath = this.getCacheFilePath(key, extension || metadata.extension);

                await fs.unlink(imagePath).catch(() => { });
                await fs.unlink(metaPath).catch(() => { });
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }
}