import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../common/hash.service';
import type { User, Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.prisma.user.findMany({
      select: { id: true, username: true, roles: true },
    });
  }

  async findById(id: number): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true, roles: true },
    });
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(data: { username: string; password: string; roles?: Role[] }) {
    const hashedData = {
      ...data,
      password: await this.hashService.hash(data.password),
    };

    return this.prisma.user.create({ data: hashedData });
  }

  async update(id: number, data: Partial<{ username: string; password: string; roles: Role[] }>) {
    const updateData = { ...data };

    if (updateData.password) {
      updateData.password = await this.hashService.hash(updateData.password);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
  
  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
