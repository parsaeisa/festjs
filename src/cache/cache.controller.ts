import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {

  constructor(private readonly cacheService: CacheService) {}

  // Exposed methods
  @Post(':category/:key')
  setCache(
    @Param('key') key: string, 
    @Param('category') category: string, 
    @Body() body: any
  ) {
    console.log(key)
    this.cacheService.setRecord(category, key, body);
    return 'Cache set';
  }

  @Get(':category/:key')
  async getCache(
    @Param('category') category: string,
    @Param('key') key: string
  ) {
    return await this.cacheService.getRecord(category, key);
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
}
