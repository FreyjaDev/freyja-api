import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RatingModule } from './rating/rating.module';

@Module({
  controllers: [AppController],
  imports: [RatingModule],
  providers: [AppService],
})
export class AppModule {}
