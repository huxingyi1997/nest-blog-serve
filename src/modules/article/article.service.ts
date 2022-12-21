import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getList(listDTO: ListDTO): Promise<Article[]> {
    const { page = 1, pageSize = 10 } = listDTO;
    const articleList = await this.articleRepository
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
      .getMany();
    return articleList;
  }

  async getOne(idDTO: IdDTO): Promise<Article> {
    const { id } = idDTO;
    const articleDetail = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .getOne();
    return articleDetail;
  }

  async create(articleCreateDTO: ArticleCreateDTO) {
    const article = await this.articleRepository.save({ ...articleCreateDTO });
    return article;
  }

  async update(articleEditDTO: ArticleEditDTO) {
    const { id, ...otherParams } = articleEditDTO;
    const article = await this.articleRepository.update(
      { id },
      { ...otherParams },
    );
    return article;
  }

  async delete(idDTO: IdDTO) {
    const { id } = idDTO;
    const article = await this.articleRepository.update(
      { id },
      { isDelete: true },
    );
    return article;
  }
}
