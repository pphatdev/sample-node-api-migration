import fs from 'fs-extra';
import path from 'path';

export class FileCache {
    constructor(options = {}) {
        this.cacheDir = options.cacheDir || '.cache-local';
        this.ttl = options.ttl || 3600; // 1 hour default
        this.init();
    }

    init() {
        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir, { recursive: true });
        }
    }

    getCacheFilePath(key) {
        return path.join(this.cacheDir, `${key}.json`);
    }

    async set(key, data) {
        const cacheData = {
            data,
            timestamp: Date.now(),
            ttl: this.ttl
        };
        await fs.writeJson(this.getCacheFilePath(key), cacheData);
    }

    async get(key) {
        try {
            const filePath = this.getCacheFilePath(key);
            if (!fs.existsSync(filePath)) return null;

            const cacheData = await fs.readJson(filePath);
            const age = (Date.now() - cacheData.timestamp) / 1000;

            if (age > cacheData.ttl) {
                await this.del(key);
                return null;
            }
            return cacheData.data;
        } catch (error) {
            return null;
        }
    }

    async del(key) {
        try {
            await fs.unlink(this.getCacheFilePath(key));
        } catch (error) {
            // Ignore deletion errors
        }
    }

    async clear() {
        try {
            await fs.emptyDir(this.cacheDir);
        } catch (error) {
            console.error('Cache clear error:', error);
        }
    }
}