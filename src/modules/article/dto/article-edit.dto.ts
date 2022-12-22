import { IsNotEmpty, IsOptional } from 'class-validator';
import { IdDTO } from './id.dto';

export class ArticleEditDTO extends IdDTO {
  @IsOptional()
  @IsNotEmpty({ message: "Title can't be null" })
  readonly title?: string;

  @IsOptional()
  @IsNotEmpty({ message: "Description can't be null" })
  readonly description?: string;

  @IsOptional()
  @IsNotEmpty({ message: "Content can't be null" })
  readonly content?: string;
}
