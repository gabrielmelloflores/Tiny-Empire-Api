import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PrismaModule, CommonModule, UsersModule, AuthModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
