import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ListDTO } from './dto/list.dto';
import { IdDTO } from './dto/id.dto';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleListResponse, ArticleListVO } from './vo/article-list.vo';
import { ArticleInfoResponse, ArticleInfoVO } from './vo/article-info.vo';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Article Module')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  @ApiOkResponse({ description: 'Article List', type: ArticleListResponse })
  async getList(@Query() listDTO: ListDTO): Promise<ArticleListVO> {
    return await this.articleService.getList(listDTO);
  }

  @Get('info')
  @ApiOkResponse({ description: 'Article Info', type: ArticleInfoResponse })
  async getOne(@Query() idDTO: IdDTO): Promise<ArticleInfoVO> {
    return await this.articleService.getOne(idDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('info')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Create an article',
    type: ArticleInfoResponse,
  })
  async create(
    @Body() articleCreateDTO: ArticleCreateDTO,
  ): Promise<ArticleInfoVO> {
    return await this.articleService.create(articleCreateDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('info')
  @ApiBearerAuth()
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

  @UseGuards(AuthGuard('jwt'))
  @Delete('info')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete an article',
    type: ArticleInfoResponse,
  })
  delete(@Query() idDTO: IdDTO): Promise<ArticleInfoVO> {
    return this.articleService.delete(idDTO);
  }
}
