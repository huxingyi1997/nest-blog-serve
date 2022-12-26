import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from '../../utils/cryptogram.util';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import { User } from './entity/user.entity';
import { UserInfoVO } from './vo/user-info.vo';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenVO } from './vo/token.vo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async checkRegisterForm(registerDTO: RegisterDTO): Promise<void> {
    const { password, mobile, passwordRepeat } = registerDTO;
    if (password !== passwordRepeat) {
      throw new NotFoundException(
        'The passwords entered twice are inconsistent, please check',
      );
    }
    const hasUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.mobile = :mobile', { mobile })
      .getOne();
    if (hasUser) {
      throw new NotFoundException('User has existed');
    }
  }

  async register(registerDTO: RegisterDTO): Promise<UserInfoVO> {
    await this.checkRegisterForm(registerDTO);
    const { nickname, password, mobile } = registerDTO;

    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);

    const newUser: User = new User();
    newUser.nickname = nickname;
    newUser.mobile = mobile;
    newUser.password = hashPassword;
    newUser.salt = salt;
    const userCreated = await this.userRepository.save(newUser);
    delete userCreated.password;
    delete userCreated.salt;
    const response = {
      info: userCreated,
    };
    return response;
  }

  async checkLoginForm(loginDTO: LoginDTO): Promise<User> {
    const { password, mobile } = loginDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not exist');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('Password error');
    }

    return user;
  }

  async certificate(user: User): Promise<string> {
    const { id, nickname, mobile } = user;
    const token = this.jwtService.sign({ id, nickname, mobile });
    return token;
  }

  async login(loginDTO: LoginDTO): Promise<TokenVO> {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.certificate(user);

    const response = {
      info: { token },
    };
    return response;
  }
}
