import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsBoolean()
  @ApiProperty()
  grammy: boolean;

  @ApiProperty()
  @IsString()
  name: string;
}
