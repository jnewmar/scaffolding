import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiPropertyOptional({ description: 'The street of the address' })
  @IsOptional()
  @IsString()
  @Length(1, 500)
  logradouro?: string;

  @ApiPropertyOptional({ description: 'The number of the address' })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  numero?: string;

  @ApiPropertyOptional({ description: 'The neighborhood of the address' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  bairro?: string;

  @ApiPropertyOptional({ description: 'The city of the address' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  cidade?: string;

  @ApiPropertyOptional({ description: 'The state of the address' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  estado?: string;
}
