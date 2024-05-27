import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CM } from '@nestjs/cache-manager';
import { CacheController } from './cache.controller';

@Module({
  providers: [CacheService],
  imports: [
    CM.register({
      ttl: 1000*1000,
      max: 3,
    }),
  ],
  controllers: [CacheController]
})
export class CacheModule {}
