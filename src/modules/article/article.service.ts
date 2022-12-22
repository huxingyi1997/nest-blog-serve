import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPagination, type Pagination } from '../../utils';
import { Repository, UpdateResult } from 'typeorm';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { Article } from './entity/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  /**
   *
   * @param listDTO
   * @returns response
   */
  async getList(
    listDTO: ListDTO,
  ): Promise<{ info: Article[]; pagination: Pagination } | never> {
    const { page = 1, pageSize = 10 } = listDTO;
    const [articleList, total] = await this.articleRepository
      .createQueryBuilder('article')
      .where({
        isDelete: false,
      })
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    if (!articleList) {
      throw new NotFoundException('Article List not exist');
    }

    const pagination = getPagination(total, page, pageSize);
    const response = { info: articleList, pagination };
    return response;
  }

  /**
   *
   * @param idDTO
   * @returns response
   */
  async getOne(idDTO: IdDTO): Promise<{ info: Article } | never> {
    const { id } = idDTO;
    const articleDetail = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .getOne();

    if (!articleDetail) {
      throw new NotFoundException('Article not exist');
    }

    const response = {
      info: articleDetail,
    };
    return response;
  }

  /**
   *
   * @param articleCreateDTO
   * @returns response
   */
  async create(
    articleCreateDTO: ArticleCreateDTO,
  ): Promise<{ info: Article } | never> {
    const article = await this.articleRepository.save({ ...articleCreateDTO });

    if (!article) {
      throw new NotFoundException('Article create error');
    }

    const response = {
      info: article,
    };
    return response;
  }

  /**
   *
   * @param articleEditDTO
   * @returns response
   */
  async update(
    articleEditDTO: ArticleEditDTO,
  ): Promise<{ info: UpdateResult } | never> {
    const { id, ...otherParams } = articleEditDTO;
    const articleUpdateResult = await this.articleRepository.update(
      { id },
      { ...otherParams },
    );
    if (!articleUpdateResult) {
      throw new NotFoundException('Article Not Exit');
    }

    const response = {
      info: articleUpdateResult,
    };
    return response;
  }

  /**
   *
   * @param idDTO
   * @returns response
   */
  async delete(idDTO: IdDTO): Promise<{ info: UpdateResult } | never> {
    const { id } = idDTO;
    const articleDeleteResult = await this.articleRepository.update(
      { id },
      { isDelete: true },
    );
    if (!articleDeleteResult) {
      throw new NotFoundException('Article Not Exit');
    }

    const response = {
      info: articleDeleteResult,
    };
    return response;
  }
}
