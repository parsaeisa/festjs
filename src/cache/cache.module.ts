import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CM } from '@nestjs/cache-manager';
import { CacheController } from './cache.controller';

@Module({
  providers: [CacheService],
  imports: [
    CM.register({
      ttl: 5,
      max: 10,
    })
  ],
  controllers: [CacheController]
})
export class CacheModule {}
