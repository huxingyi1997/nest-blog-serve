import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { LoginDTO } from './login.dto';

export class RegisterDTO extends LoginDTO {
  @ApiProperty({
    description: "User's nickname",
    example: 'Tusimple',
  })
  @IsNotEmpty({ message: "Please input user's nickname" })
  @IsString({ message: 'Nickname should be a string type' })
  readonly nickname: string;

  @ApiProperty({
    description: "User's repeat password",
    example: '123456',
  })
  @IsNotEmpty({ message: 'Please input password again' })
  readonly passwordRepeat: string;
}
