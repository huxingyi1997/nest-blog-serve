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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleListResponse, ArticleListVO } from './vo/article-list.vo';
import { ArticleInfoResponse, ArticleInfoVO } from './vo/article-info.vo';

@ApiTags('Article Module')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  @ApiOkResponse({ description: 'Article List', type: ArticleListResponse })
  getList(@Query() listDTO: ListDTO): Promise<ArticleListVO> {
    return this.articleService.getList(listDTO);
  }

  @Get('info')
  @ApiOkResponse({ description: 'Article Info', type: ArticleInfoResponse })
  getOne(@Query() idDTO: IdDTO): Promise<ArticleInfoVO> {
    return this.articleService.getOne(idDTO);
  }

  @Post('info')
  @ApiOkResponse({
    description: 'Create an article',
    type: ArticleInfoResponse,
  })
  create(@Body() articleCreateDTO: ArticleCreateDTO): Promise<ArticleInfoVO> {
    return this.articleService.create(articleCreateDTO);
  }

  @Put('info')
  @ApiOkResponse({
    description: 'Edit an article',
    type: ArticleInfoResponse,
  })
  update(
    @Query() idDTO: IdDTO,
    @Body() articleEditDTO: ArticleEditDTO,
  ): Promise<ArticleInfoVO> {
    return this.articleService.update(idDTO, articleEditDTO);
  }

  @Delete('info')
  @ApiOkResponse({
    description: 'Delete an article',
    type: ArticleInfoResponse,
  })
  delete(@Query() idDTO: IdDTO): Promise<ArticleInfoVO> {
    return this.articleService.delete(idDTO);
  }
}
