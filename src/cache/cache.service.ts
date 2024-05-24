import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getRecord(
        key: string
    ) {
        const value = await this.cacheManager.get(key);
    }

    async setRecord(
        key: string,
        value: string,
    ) {
        await this.cacheManager.set(key, value);
    }

    async reseet() {
        await this.cacheManager.reset();
    }
}
