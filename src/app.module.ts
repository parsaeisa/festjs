import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { PostModule } from './post/post.module';
import { AuthorModule } from './author/author.module';
import { CacheModule } from './cache/cache.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DbModule,
    PostModule,
    AuthorModule,
    CacheModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),    
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
