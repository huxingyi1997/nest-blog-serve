import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPagination } from '../../utils';
import { Repository } from 'typeorm';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { Article } from './entity/article.entity';
import { ArticleListVO } from './vo/article-list.vo';
import { ArticleInfoVO } from './vo/article-info.vo';

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
  async getList(listDTO: ListDTO): Promise<ArticleListVO> {
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
  async getOne(idDTO: IdDTO): Promise<ArticleInfoVO> {
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
  async create(articleCreateDTO: ArticleCreateDTO): Promise<ArticleInfoVO> {
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
   * @param idDTO, articleEditDTO
   * @returns response
   */
  async update(
    idDTO: IdDTO,
    articleEditDTO: ArticleEditDTO,
  ): Promise<ArticleInfoVO> {
    const { id } = idDTO;
    const articleUpdateResult = await this.articleRepository.update(
      { id },
      articleEditDTO,
    );
    if (!articleUpdateResult) {
      throw new NotFoundException('Article Not Exit');
    }
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .getOne();
    const response = {
      info: article,
    };
    return response;
  }

  /**
   *
   * @param idDTO
   * @returns response
   */
  async delete(idDTO: IdDTO): Promise<ArticleInfoVO> {
    const { id } = idDTO;
    const articleDeleteResult = await this.articleRepository.update(
      { id },
      { isDelete: true },
    );
    if (!articleDeleteResult) {
      throw new NotFoundException('Article Not Exit');
    }

    const article = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .getOne();
    const response = {
      info: article,
    };
    return response;
  }
}
