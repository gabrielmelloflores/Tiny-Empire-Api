import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';

describe('HashService', () => {
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    service = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash a password', async () => {
    const password = 'testPassword123';
    const hash = await service.hash(password);

    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
    expect(hash.length).toBeGreaterThan(password.length);
  });

  it('should compare password with hash', async () => {
    const password = 'testPassword123';
    const hash = await service.hash(password);

    const isMatch = await service.compare(password, hash);
    expect(isMatch).toBe(true);
  });

  it('should not match incorrect password', async () => {
    const password = 'testPassword123';
    const wrongPassword = 'wrongPassword456';
    const hash = await service.hash(password);

    const isMatch = await service.compare(wrongPassword, hash);
    expect(isMatch).toBe(false);
  });

  it('should generate different hashes for same password', async () => {
    const password = 'testPassword123';
    const hash1 = await service.hash(password);
    const hash2 = await service.hash(password);

    expect(hash1).not.toBe(hash2);
    // But both should match the password
    expect(await service.compare(password, hash1)).toBe(true);
    expect(await service.compare(password, hash2)).toBe(true);
  });

  it('should generate salt', async () => {
    const salt = await service.genSalt();
    expect(salt).toBeDefined();
    expect(salt.length).toBeGreaterThan(0);
  });
});
