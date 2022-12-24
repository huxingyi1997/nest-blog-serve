import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from '../../../utils';

export class IdDTO {
  @ApiProperty({
    description: 'Article id',
    example: 1,
  })
  @Matches(regPositive, { message: 'Please input effective id' })
  @IsNotEmpty({ message: "Id can't be null" })
  readonly id: number;
}
