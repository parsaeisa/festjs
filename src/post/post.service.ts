import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PostService {
  constructor(private prisma: DbService) {}

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.post.findMany();
  }

  async findFiltered(where: Prisma.PostWhereInput) {
    return this.prisma.post.findMany({
      where
    })
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
