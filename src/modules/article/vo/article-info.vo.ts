import { ApiProperty } from '@nestjs/swagger';
import { ArticleInfoItem } from './article-base.vo';

export class ArticleInfoVO {
  @ApiProperty({ type: ArticleInfoItem })
  info: ArticleInfoItem;
}

export class ArticleInfoResponse {
  @ApiProperty({ description: 'Code Status', example: 200 })
  code: number;

  @ApiProperty({
    description: 'data',
    type: () => ArticleInfoVO,
    example: ArticleInfoVO,
  })
  data: ArticleInfoVO;

  @ApiProperty({
    description: 'The message of request info',
    example: 'success',
  })
  message: string;
}
