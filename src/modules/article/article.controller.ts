import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ListDTO } from './dto/list.dto';
import { IdDTO } from './dto/id.dto';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  getList(@Query() listDTO: ListDTO) {
    return this.articleService.getList(listDTO);
  }

  @Get('info')
  getOne(@Query() idDTO: IdDTO) {
    return this.articleService.getOne(idDTO);
  }

  @Post('create')
  create(@Body() articleCreateDTO: ArticleCreateDTO) {
    return this.articleService.create(articleCreateDTO);
  }

  @Put('edit')
  update(@Body() articleEditDTO: ArticleEditDTO) {
    return this.articleService.update(articleEditDTO);
  }

  @Delete('delete')
  delete(@Query() idDTO: IdDTO) {
    return this.articleService.delete(idDTO);
  }
}
