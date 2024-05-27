import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getRecord(
        key: string 
    ) {
        let result = await this.cacheManager.get<string>(key);
        console.log(result)
        return result;
    }

    async setRecord(
        key: string,
        value: any,
    ) {
        await this.cacheManager.set(key, value);
    }

    async reset() {
        await this.cacheManager.reset();
    }
}
