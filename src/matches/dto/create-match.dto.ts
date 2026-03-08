import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateMatchDto {

  @ApiProperty({
    example: 'Epic Battle',
    description: 'Name of the match',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 4,
    description: 'Maximum number of players allowed in the match',
  })
  @IsInt()
  @Min(1)
  maxPlayers: number;
}