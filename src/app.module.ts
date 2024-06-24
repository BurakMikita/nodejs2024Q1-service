import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SetContentTypeMiddleware } from './middleware/setContentType.middleware';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritModule } from './favorit/favorit.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavoritModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetContentTypeMiddleware).forRoutes('*');
  }
}
