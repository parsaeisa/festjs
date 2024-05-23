import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [DbModule],
})
export class PostModule {}
