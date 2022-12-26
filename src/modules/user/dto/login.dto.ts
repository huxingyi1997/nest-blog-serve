import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regMobileCN } from '../../../utils';

export class LoginDTO {
  @ApiProperty({
    description: 'Phone number, unique',
    example: '13888888888',
  })
  @Matches(regMobileCN, { message: 'Please input correct phone number' })
  @IsNotEmpty({ message: 'Please input phone number' })
  readonly mobile: string;

  @ApiProperty({
    description: "User's password",
    example: '123456',
  })
  @IsNotEmpty({ message: 'Please input password' })
  readonly password: string;
}
