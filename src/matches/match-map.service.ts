import { Injectable } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CitiesService } from "src/cities/cities.service";
import { CityType } from "@prisma/client";

@Injectable()
export class matchMapService {
    constructor (
        private prisma: PrismaService,
        private matchesService: MatchesService,
        private citiesService: CitiesService

    ){}
    async generateMatchMap(matchId: number){
        const players = await this.prisma.player.findMany({
            where: { matchId },
            orderBy: { turnOrder: 'asc' },
        });

        // 1. criar capitais
        await this.createCapitalCities(matchId, players);
        // 2. criar cidades neutras
        await this.createNeutralCities(matchId);
        // 3. criar ruins
        await this.createRuisCities(matchId);
        // 4. criar conexões
    }

    async createCapitalCities(matchId: number, players: any[]){
        for(const player of players){
            await this.citiesService.create({
                name: `Capital ${player.id}`,
                matchId: matchId,
                ownerPlayerId: player.id,
                type:  CityType.CAPITAL,
                defense: 3,
                isCapital: true
            });
        }
    }

    async createNeutralCities(matchId: number){
        const neutralCities = [
            { name: 'Greenfield', type: CityType.FARM_SETTLEMENT },
            { name: 'Irondeep', type: CityType.MINING_TOWN },
            { name: 'Stonewatch', type: CityType.FORTRESS },
            { name: 'Goldhaven', type: CityType.MARKET_TOWN },
        ];
        
        for (const city of neutralCities) {
            await this.citiesService.create({
                name: city.name,
                matchId: matchId,
                type: city.type,
                defense: 1
            });
        }
    }

    async createRuisCities(matchId: number){
        await this.citiesService.create({
            name: 'Ruins of Kar',
            matchId: matchId,
            type: CityType.RUINS,
            defense: 2
        })
    }
}

