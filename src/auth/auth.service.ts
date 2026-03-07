import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService
  ) {}

  async signIn(username: string, pass: string,): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValid = await this.hashService.compare(pass, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const payload = { 
      sub: user.id, 
      username: user.username,
      roles: user.roles,
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
