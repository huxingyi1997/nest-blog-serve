import { ApiProperty } from '@nestjs/swagger';

export class TokenItem {
  @ApiProperty({ description: 'token', example: 'sdfghjkldasascvbnm' })
  token: string;
}

export class TokenVO {
  @ApiProperty({ type: TokenItem })
  info: TokenItem;
}

export class TokenResponse {
  @ApiProperty({ description: 'Code Status', example: 200 })
  code: number;

  @ApiProperty({
    description: 'data',
    type: () => TokenVO,
    example: TokenVO,
  })
  data: TokenVO;

  @ApiProperty({
    description: 'The message of request info',
    example: 'success',
  })
  message: string;
}
