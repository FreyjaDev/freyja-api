import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { RatingModule } from './modules/rating/rating.module';

@Module({
  controllers: [AppController],
  imports: [RatingModule, CommonModule],
  providers: [AppService],
})
export class AppModule {}
