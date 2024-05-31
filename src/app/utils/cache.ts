class CacheEntry {
    cacheKey: string;
    createTime: Date;
    timeout: Date;
    value: any;

    constructor(cacheKey: string, value: any, timeout: Date) {
        this.cacheKey = cacheKey;
        this.createTime = new Date();
        this.timeout = timeout;
        this.value = value;
    }
}

class Cache {
    private cache: Map<string, CacheEntry> = new Map();
    private defaultTimeout: number;

    constructor(defaultTimeout: number = 300) {
        this.defaultTimeout = defaultTimeout;
        this.cleanCache();
    }

    private cleanCache() {
        const now = new Date();
        this.cache.forEach((entry, key) => {
            if (entry.timeout < now) {
                this.cache.delete(key);
            }
        });
    }

    private validateKey(key: string) {
        if (!key) {
            throw new Error('Key cannot be null or undefined');
        }
    }

    private validateValue(value: any) {
        if (value === null || value === undefined) {
            throw new Error('Value cannot be null or undefined');
        }
    }

    private validateTimeout(timeout?: Date): Date {
        if (!timeout) {
            timeout = new Date();
            timeout.setSeconds(timeout.getSeconds() + this.defaultTimeout);
        }
        if (timeout < new Date()) {
            throw new Error('Timeout must be in the future');
        }
        return timeout;
    }

    add(key: string, value: any, timeout?: Date) {
        this.validateKey(key);
        this.validateValue(value);
        timeout = this.validateTimeout(timeout);

        if (this.cache.has(key)) {
            throw new Error('Key already exists');
        }

        const entry = new CacheEntry(key, value, timeout);
        this.cache.set(key, entry);
        return entry.value;
    }

    set(key: string, value: any, timeout?: Date) {
        this.validateKey(key);
        this.validateValue(value);
        timeout = this.validateTimeout(timeout);

        const entry = new CacheEntry(key, value, timeout);
        this.cache.set(key, entry);
        return entry.value;
    }

    get(key: string): any {
        this.validateKey(key);

        const entry = this.cache.get(key);
        if (!entry || entry.timeout < new Date()) {
            this.cache.delete(key);
            throw new Error('Key not found');
        }

        return entry.value;
    }

    delete(key: string) {
        this.validateKey(key);
        this.cache.delete(key);
        return true;
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }
}

export default Cache;
