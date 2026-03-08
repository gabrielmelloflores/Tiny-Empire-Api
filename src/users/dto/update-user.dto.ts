import { IsString, IsOptional, IsNumber, MinLength, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
