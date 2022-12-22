import { IsNotEmpty } from 'class-validator';

export class ArticleCreateDTO {
  @IsNotEmpty({ message: "Title can't be null" })
  readonly title: string;

  @IsNotEmpty({ message: "Description can't be null" })
  readonly description: string;

  @IsNotEmpty({ message: "Content can't be null" })
  readonly content: string;
}
