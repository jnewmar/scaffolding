import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  @ApiProperty({ description: 'The street of the address' })
  logradouro: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  @ApiProperty({ description: 'The number of the address' })
  numero: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiProperty({ description: 'The neighborhood of the address' })
  bairro: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiProperty({ description: 'The city of the address' })
  cidade: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiProperty({ description: 'The state of the address' })
  estado: string;
}

export class CreateAddressDtoWithId extends CreateAddressDto {
  @ApiProperty({ description: 'The id of the address' })
  id: number;
}
