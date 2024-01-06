import { Module } from '@nestjs/common';
import { RatingTypeController } from './controllers/rating-type/rating-type.controller';

@Module({
  controllers: [RatingTypeController]
})
export class RatingModule {}
