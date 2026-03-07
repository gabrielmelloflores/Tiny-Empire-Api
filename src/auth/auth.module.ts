import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CryptoService } from './crypto.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guards';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [
    AuthService,
    CryptoService,
    // first apply basic JWT authentication guard globally
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // then apply roles guard so @Roles() metadata is enforced
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, CryptoService],
})
export class AuthModule {}
