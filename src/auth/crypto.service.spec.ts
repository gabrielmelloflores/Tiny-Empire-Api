import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt and decrypt text correctly', async () => {
    const textToEncrypt = 'TestPassword123';
    const encryptedData = await service.encrypt(textToEncrypt);

    expect(encryptedData).toHaveProperty('encrypted');
    expect(encryptedData).toHaveProperty('iv');

    const decryptedText = await service.decrypt(
      encryptedData.encrypted,
      encryptedData.iv,
    );
    expect(decryptedText).toBe(textToEncrypt);
  });

  it('should produce different encrypted outputs for the same input', async () => {
    const text = 'Test';
    const encrypted1 = await service.encrypt(text);
    const encrypted2 = await service.encrypt(text);

    // IVs should be different due to randomBytes
    expect(encrypted1.iv).not.toBe(encrypted2.iv);
    // Encrypted data should be different due to different IVs
    expect(encrypted1.encrypted).not.toBe(encrypted2.encrypted);

    // But both should decrypt to the same value
    const decrypted1 = await service.decrypt(
      encrypted1.encrypted,
      encrypted1.iv,
    );
    const decrypted2 = await service.decrypt(
      encrypted2.encrypted,
      encrypted2.iv,
    );
    expect(decrypted1).toBe(decrypted2);
    expect(decrypted1).toBe(text);
  });
});
