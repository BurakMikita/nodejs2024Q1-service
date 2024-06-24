import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  duration: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  artistId: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  albumId: string | null;
}
