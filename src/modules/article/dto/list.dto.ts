import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';
import { regPositiveOrEmpty } from '../../../utils';

export class ListDTO {
  @ApiProperty({
    description: 'Aricle page count in total arcticle list',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Matches(regPositiveOrEmpty, { message: "page shouldn't be negtive" })
  readonly page?: number;

  @ApiProperty({
    description: 'The count of aricles in a page',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Matches(regPositiveOrEmpty, { message: "pageSize shouldn't be negtive" })
  readonly pageSize?: number;
}
