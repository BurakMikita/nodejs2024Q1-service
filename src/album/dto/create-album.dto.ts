import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
