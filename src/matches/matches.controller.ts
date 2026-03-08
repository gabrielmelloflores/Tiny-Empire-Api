import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@ApiTags('Matches')
@ApiBearerAuth('access-token')
@Controller('matches')
export class MatchesController {
    constructor(
        private matchService: MatchesService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Retrieve all matches' })
    @ApiResponse({ status: 200, description: 'List of matches' })
    async findAll() {
       return this.matchService.findAll(); 
    }

    @Post()
    @ApiOperation({ summary: 'Create a new match' })
    async createMatch(@Body() dto: CreateMatchDto, @CurrentUser() user: any) {
        return this.matchService.create(dto, user.sub);
    }
}
