import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Match } from '@prisma/client';
import { matchMapService } from './match-map.service';
import { CitiesService } from 'src/cities/cities.service';

@Injectable()
export class MatchesService {
    constructor(
        private prisma: PrismaService,
        private matchMapService: matchMapService,
        private citiesService: CitiesService,
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

    async startMatch(matchId: number){
        const match = await this.prisma.match.findUnique({ 
            where: { id:matchId },
            include: { players: true }
        });

        if(!match){
            throw new NotFoundException('Match not found');
        }

        //todo - validação menos de 2 jogadores

        await this.matchMapService.generateMatchMap(matchId);

        return this.prisma.match.update({
            where: { id: matchId },
            data: {
                status: 'running',
                currentPlayerId: match.players[0].id
            }
        })
    }

    async getMatchCities(matchId: number) {
        return this.citiesService.getMatchCitiesState(matchId);
    }
}
