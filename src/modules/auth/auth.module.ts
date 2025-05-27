import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersRepository } from '../users/users.repository';
import { RefreshTokensService } from './refresh-tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../../prisma.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('app.accessTokenSecret'),
        signOptions: {
          expiresIn: configService.get('app.accessTokenExpTime'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UsersRepository, RefreshTokensService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
