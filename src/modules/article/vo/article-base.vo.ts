import { ApiProperty } from '@nestjs/swagger';

class ArticleBaseItem {
  @ApiProperty({
    description: 'Article id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Create time of article',
    example: '2022-12-12',
  })
  createTime: Date;

  @ApiProperty({
    description: 'Create time of article',
    example: '2022-12-12',
  })
  updateTime: Date;

  @ApiProperty({
    description: 'Article title',
    example: 'I have a dream',
  })
  title: string;

  @ApiProperty({
    description: 'Article description',
    example: 'The dream of mine about politics',
  })
  description: string;
}

export class ArticleListItem extends ArticleBaseItem {}

export class ArticleInfoItem extends ArticleBaseItem {
  @ApiProperty({
    description: 'Article content',
    example: 'I have dream that one day',
  })
  content: string;
}
