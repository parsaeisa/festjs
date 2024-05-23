import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body() postData: { id?: string
      slug: string,
      title: string,
      body: string,
      authorId: string
    },
  ): Promise<PostEntity> {
    const { slug, title, body, authorId } = postData;

    return this.postService.create({
      slug,
      title,
      body, 
      author: {
        connect : {id: authorId},
      }     
    });
  }

  @Get()
  async getAllPosts() {
    return this.postService.findAll();
  }

  @Get(':searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostEntity[]> {
    return this.postService.findFiltered({      
        OR: [
          {
            title: { contains: searchString },
          },
          {
            body: { contains: searchString },
          },
        ],
      }
    );
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  async removePost(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
