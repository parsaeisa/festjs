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
        category: string,
        key: string 
    ) {
        const storeKey = this.getCategoryKey(category, key)
        return await this.cache.get(storeKey);
    }

    async setRecord(
        category: string,
        key: string,
        value: any,
    ) {
        const storeKey = this.getCategoryKey(category, key)
        await this.cache.set(storeKey, value, {
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

    // Private method
    private getCategoryKey(category: string, key: string): string {
        return `${category}:${key}`;
    }
}
