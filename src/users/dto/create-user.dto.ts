import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  nome: string;

  @ApiProperty({ description: 'The CPF of the user' })
  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  cpf: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 15)
  telefone: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateUserDtoWithId extends CreateUserDto {
  @ApiProperty({ description: 'The id of the user' })
  id: number;
}
