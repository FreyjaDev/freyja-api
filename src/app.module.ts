import { Module } from '@nestjs/common';

import { CommonModule } from './modules/common/common.module';
import { RatingModule } from './modules/rating/rating.module';

@Module({
  controllers: [],
  imports: [RatingModule, CommonModule],
  providers: [],
})
export class AppModule {}
