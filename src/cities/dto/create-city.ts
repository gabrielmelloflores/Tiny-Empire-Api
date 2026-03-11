import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsEnum, IsBoolean, Min } from 'class-validator';
import { CityType } from '@prisma/client';

export class CreateCityDto {

  @ApiProperty({
    example: 'Stonewatch',
    description: 'Name of the city',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Match ID where the city belongs',
  })
  @IsInt()
  matchId: number;

  @ApiProperty({
    example: 2,
    description: 'Player who owns the city (optional for neutral cities)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerPlayerId?: number;

  @ApiProperty({
    enum: CityType,
    example: CityType.FORTRESS,
  })
  @IsEnum(CityType)
  type: CityType;

  @ApiProperty({
    example: 0,
    description: 'Base defense of the city',
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  defense?: number;

  @ApiProperty({
    example: false,
    description: 'Defines if this city is a capital',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isCapital?: boolean;
}