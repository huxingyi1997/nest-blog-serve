import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ArticleEditDTO {
  @ApiProperty({
    description: 'Article title',
    example: 'I have a dream',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({
    message: "Title can't be null, please input the title of article",
  })
  readonly title?: string;

  @ApiProperty({
    description: 'Article description',
    example: 'The dream of mine about politics',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({
    message:
      "Description can't be null, please input the description of article",
  })
  readonly description?: string;

  @ApiProperty({
    description: 'Article content',
    example: 'I have dream that one day',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({
    message: "Content can't be null, please input the content of article",
  })
  readonly content?: string;
}
