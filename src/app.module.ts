import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from './db/db.module';
import { PostModule } from './post/post.module';
import { AuthorModule } from './author/author.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    DbModule,
    PostModule,
    AuthorModule,
    CacheModule // TODO: What to put here ???
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
