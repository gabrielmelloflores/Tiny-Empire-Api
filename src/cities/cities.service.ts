import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDto } from './dto';

@Injectable()
export class CitiesService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getMatchCitiesState(matchId: number){
        return this.prisma.city.findMany({
            where : { matchId },
            include: {
                buildings: true,
                owner: true,
            },
        })
    }

    async create(dto: CreateCityDto){
        return this.prisma.city.create({
            data: {
                name: dto.name,
                matchId: dto.matchId,
                ownerPlayerId: dto.ownerPlayerId,
                type: dto.type,
                defense: dto.defense ?? 0,
                isCapital: dto.isCapital ?? false
            }
        })
    }
}
