import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Match } from '@prisma/client';

@Injectable()
export class MatchesService {
    constructor(
        private prisma: PrismaService
    ) {}
    
    async findAll(): Promise<Match[]> {
        return this.prisma.match.findMany();
    }

    async create(dto: CreateMatchDto, userId: number) {
        return this.prisma.$transaction(async (tx) => {
            const match = await tx.match.create({
                data: {
                    name: dto.name,
                    maxPlayers: dto.maxPlayers
                }
            });

            const player = await tx.player.create({
                data: {
                    userId,
                    matchId: match.id,
                }
            });

            const updatedMatch = await tx.match.update({
                where: { id: match.id },
                data: {
                    currentPlayerId: player.id,
                },
                include: {
                    players: true,
                    currentPlayer: true,
                },
            });

            return updatedMatch;
        })
    }
}
