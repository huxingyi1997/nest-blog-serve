import { ApiProperty } from '@nestjs/swagger';

export class UserInfoItem {
  @ApiProperty({ description: 'User id', example: 1 })
  id: number;

  @ApiProperty({ description: 'Create time of user', example: '2022-12-12' })
  createTime: Date;

  @ApiProperty({ description: 'Update time of user', example: '2022-12-12' })
  updateTime: Date;

  @ApiProperty({ description: ' Phone number', example: '13088888888' })
  readonly mobile: string;
}

export class UserInfoVO {
  @ApiProperty({ type: UserInfoItem })
  info: UserInfoItem;
}

export class UserInfoResponse {
  @ApiProperty({ description: 'Code Status', example: 200 })
  code: number;

  @ApiProperty({
    description: 'data',
    type: () => UserInfoVO,
    example: UserInfoVO,
  })
  data: UserInfoVO;

  @ApiProperty({
    description: 'The message of request info',
    example: 'success',
  })
  message: string;
}
