import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cities')
@ApiBearerAuth('access-token')
@Controller('cities')
export class CitiesController {
}
