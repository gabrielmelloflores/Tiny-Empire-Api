import { Injectable } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt,
} from 'node:crypto';
import { promisify } from 'node:util';

export interface EncryptedData {
  encrypted: string;
  iv: string;
}

@Injectable()
export class CryptoService {
  private readonly password =
    process.env.ENCRYPTION_KEY || 'default-password-change-in-production';

  async encrypt(text: string): Promise<EncryptedData> {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(
      this.password,
      'salt',
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(text),
      cipher.final(),
    ]);

    return {
      encrypted: encryptedText.toString('hex'),
      iv: iv.toString('hex'),
    };
  }

  async decrypt(encryptedText: string, iv: string): Promise<string> {
    const key = (await promisify(scrypt)(
      this.password,
      'salt',
      32,
    )) as Buffer;
    const decipher = createDecipheriv(
      'aes-256-ctr',
      key,
      Buffer.from(iv, 'hex'),
    );

    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);

    return decryptedText.toString();
  }
}
