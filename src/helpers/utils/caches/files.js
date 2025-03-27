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
        const filePath = path.resolve(this.cacheDir, `${key}.json`);
        const relative = path.relative(this.cacheDir, filePath);
        if (relative.startsWith('..') || path.isAbsolute(relative)) {
            throw new Error('Invalid cache key');
        }
        return filePath;
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
            const filePath = this.getCacheFilePath(key);
            await fs.unlink(filePath);
        } catch (error) {
            if (error.message !== 'Invalid cache key') {
                // Ignore deletion errors
            }
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