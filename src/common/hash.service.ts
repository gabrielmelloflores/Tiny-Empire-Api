import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltOrRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltOrRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async genSalt(): Promise<string> {
    return bcrypt.genSalt();
  }
}