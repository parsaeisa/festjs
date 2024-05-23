import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { DbService } from './../db/db.service';
import { Author, Prisma } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private prisma: DbService) {}

  create(data: Prisma.AuthorCreateInput): Promise<Author> {
    return this.prisma.author.create({
      data,
    });
  }

  findAll(): Promise<Author[]> {
    return this.prisma.author.findMany();
  }

  findOne(id: string) {
    return this.prisma.author.findFirst({
      where: {
        id: {equals: id}
      },
      include: {
        posts: true
      }
    });
  }

  async update(id: string, data: Prisma.AuthorUpdateInput) {
    return this.prisma.author.update({
      data,
      where: {
        id: id,
      }
    });
  }

  async delete(id: string) {
    return this.prisma.author.delete({
      where: {
        id: id,
      }
    });
  }
}
