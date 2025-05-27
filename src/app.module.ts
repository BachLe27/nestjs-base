import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/env/app.config';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [
        appConfig,
        // larkConfig
      ],
    }),
  ],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, UsersService, ConfigService],
})
export class AppModule {}
