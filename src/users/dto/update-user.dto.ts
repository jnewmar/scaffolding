import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsOptional()
  @IsString()
  @Length(1, 500)
  nome?: string;

  @ApiProperty({ description: 'The CPF of the user' })
  @IsOptional()
  @IsString()
  @Length(11, 11)
  cpf?: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsOptional()
  @IsString()
  @Length(1, 15)
  telefone?: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
