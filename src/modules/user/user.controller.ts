import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from './user.service';
import { TokenResponse, TokenVO } from './vo/token.vo';
import { UserInfoResponse, UserInfoVO } from './vo/user-info.vo';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({ description: 'register', type: UserInfoResponse })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<UserInfoVO> {
    return this.userService.register(registerDTO);
  }

  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ description: 'login', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<TokenVO> {
    return this.userService.login(loginDTO);
  }
}
