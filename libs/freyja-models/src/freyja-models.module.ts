import { Module } from '@nestjs/common';
import { FreyjaModelsService } from './freyja-models.service';

@Module({
  providers: [FreyjaModelsService],
  exports: [FreyjaModelsService],
})
export class FreyjaModelsModule {}
