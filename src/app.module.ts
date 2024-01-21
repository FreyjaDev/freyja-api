import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { RatingModule } from './rating/rating.module';

@Module({
  controllers: [AppController],
  imports: [RatingModule, CommonModule],
  providers: [AppService],
})
export class AppModule {}
