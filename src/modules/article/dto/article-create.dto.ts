import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ArticleCreateDTO {
  @ApiProperty({
    description: 'Article title',
    example: 'I have a dream',
  })
  @IsNotEmpty({ message: "Title can't be null" })
  readonly title: string;

  @ApiProperty({
    description: 'Article description',
    example: 'The dream of mine about politics',
  })
  @IsNotEmpty({ message: "Description can't be null" })
  readonly description: string;

  @ApiProperty({
    description: 'Article content',
    example: 'I have dream that one day',
  })
  @IsNotEmpty({ message: "Content can't be null" })
  readonly content: string;
}
