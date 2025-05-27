import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from '../users/users.repository';
import { Errors } from 'src/constants/error.constant';
import { BaseException } from 'src/filter-exceptions/base.exception';
import * as bcrypt from 'bcrypt';
import { JwtPayloadModel } from '../models/jwt-payload.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokensService } from './refresh-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly refreshTokenService: RefreshTokensService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.getAuthenticatedUser(email, password);
    const { accessToken, refreshToken } = await this.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      roleId: user.roleId,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        ...user,
      },
    };
  }

  private async generateToken(payload: JwtPayloadModel) {
    // Generate refreshToken
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('app.refreshTokenSecret'),
      expiresIn: `${this.configService.get('app.refreshTokenExpTime')}`,
    });

    const newRefreshToken = await this.refreshTokenService.create({
      value: refreshToken,
      userId: payload.id,
    });

    // Generate accessToken with payload have refreshTokenId
    const accessToken = await this.jwtService.signAsync(
      {
        ...payload,
        refreshTokenId: newRefreshToken.id,
      },
      {
        secret: this.configService.get('app.accessTokenSecret'),
        expiresIn: `${this.configService.get('app.accessTokenExpTime')}`,
      },
    );

    return {
      refreshToken,
      accessToken,
    };
  }

  private async getAuthenticatedUser(email: string, plainPassword: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BaseException(Errors.AUTH.WRONG_CREDENTIALS);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const checkPassword = await bcrypt.compare(plainPassword, user.password);

    if (!checkPassword) {
      throw new BaseException(Errors.AUTH.WRONG_CREDENTIALS);
    }

    return user;
  }
}
