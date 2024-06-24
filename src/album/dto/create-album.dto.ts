import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNumber()
  @ApiProperty()
  year: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @ApiProperty()
  name: string;
}
