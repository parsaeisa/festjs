import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {

  constructor(private readonly cacheService: CacheService) {}

  // Exposed methods
  @Post(':key')
  setCache(@Param('key') key: string, @Body() body: any) {
    console.log(key)
    this.cacheService.setRecord(key, body);
    return 'Cache set';
  }

  @Get(':key')
  async getCache(@Param('key') key: string) {
    return await this.cacheService.getRecord(key);
  }

  @Delete()
  async resetCache() {
    await this.cacheService.reset();
    return 'Cache reset';
  }

  @Get()
  async getFreeCacheSpace() {
    return await this.cacheService.getFreeCacheSpace();
  }

  // Private method
  private getCategoryKey(category: string, key: string): string {
    return `${category}:${key}`;
  }
}
