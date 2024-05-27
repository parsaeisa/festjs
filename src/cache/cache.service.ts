import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { LRUCache } from 'lru-cache';

@Injectable()
export class CacheService {

    private cache: LRUCache<string, any>;

    constructor(
        private configService: ConfigService
    ) {
        this.cache = new LRUCache({ 
            max: Math.abs(this.configService.get<number>('CACHE_CAPACITY')),
            ttl: 1000*1000,                        
        });
    }

    
    async getRecord(
        key: string 
    ) {
        let result = await this.cache.get(key);
        console.log(result)
        return result;
    }

    async setRecord(
        key: string,
        value: any,
    ) {
        await this.cache.set(key, value, {
            ttl: 5*1000
        });
    }

    async reset() {
        await this.cache.clear();
    }

    async getFreeCacheSpace() {

        let element_counts=0;
        for (const key of this.cache.keys()) {
            element_counts += 1;    
            console.log("Key:", key);
        }
        
        return this.cache.max - element_counts;
    }
}
