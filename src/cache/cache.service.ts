import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private configService: ConfigService
    ) {}

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

    async getFreeCacheSpace() {
        const memoryCache = this.cacheManager.store;        

        if ('keys' in memoryCache){
            console.log("second if clause");
            const keys = await memoryCache.keys();
            // console.log(keys)
            const usedSpace = keys.length;
            const freeSpace = this.configService.get<number>('CACHE_CAPACITY') - usedSpace;
            return { usedSpace, freeSpace };
        }
        
        return null;
    }
}
