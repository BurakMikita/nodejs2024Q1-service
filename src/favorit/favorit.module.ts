import { Module } from '@nestjs/common';
import { FavoritService } from './favorit.service';
import { FavoritController } from './favorit.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FavoritController],
  providers: [FavoritService],
  imports: [PrismaModule],
})
export class FavoritModule {}
