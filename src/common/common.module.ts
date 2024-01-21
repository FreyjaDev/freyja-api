import { FreyjaModelsModule } from '@freyja-models/freyja-models/freyja-models.module';
import { GuildRepository } from '@freyja-models/freyja-models/repositories/guild/guild.repository';
import { Module } from '@nestjs/common';

import { GuildController } from './controllers/guild/guild.controller';
import { GuildService } from './services/guild/guild.service';

@Module({
  controllers: [GuildController],
  imports: [FreyjaModelsModule.forFeature([GuildRepository])],
  providers: [GuildService],
})
export class CommonModule {}
