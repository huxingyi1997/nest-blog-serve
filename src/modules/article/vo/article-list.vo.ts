import { ApiProperty } from '@nestjs/swagger';
import { ArticleListItem } from './article-base.vo';

class Pagination {
  @ApiProperty({
    description: 'Aricle page count in total arcticle list',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'The count of aricles in a page',
    example: 10,
  })
  pageSize: number;

  @ApiProperty({ description: 'The count of pages in the list', example: 10 })
  pages: number;

  @ApiProperty({
    description: 'The total count of aricles in the list',
    example: 100,
  })
  total: number;
}

export class ArticleListVO {
  @ApiProperty({ type: ArticleListItem, isArray: true })
  info: Array<ArticleListItem>;

  @ApiProperty({ type: () => Pagination })
  pagination: Pagination;
}

export class ArticleListResponse {
  @ApiProperty({ description: 'Code Status', example: 200 })
  code: number;

  @ApiProperty({
    description: 'data',
    type: () => ArticleListVO,
    example: ArticleListVO,
  })
  data: ArticleListVO;

  @ApiProperty({
    description: 'The message of request info',
    example: 'success',
  })
  message: string;
}
