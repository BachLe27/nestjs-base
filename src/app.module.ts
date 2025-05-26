import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './modules/auth/auth.controller';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService],
})
export class AppModule {}
