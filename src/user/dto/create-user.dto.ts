import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
