import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from '@prisma/client';
import { connect } from 'http2';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('post')
  create(
    @Body() postData: { name: string; email?: string},
  ): Promise<Author> {
    const { name, email} = postData;

    return this.authorService.create({
      name,
      email
    });
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
