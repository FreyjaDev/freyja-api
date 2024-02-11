import { Module } from '@nestjs/common';

import { CommonModule } from './modules/common/common.module';

@Module({
  controllers: [],
  imports: [CommonModule],
  providers: [],
})
export class AppModule {}
