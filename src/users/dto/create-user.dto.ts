import { IsString, IsNotEmpty, MinLength, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    example: 'John',
    description: 'Name o the username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 123456,
    description: 'Password minimun 6 characteres',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
