import { FreyjaModelsModule } from '@freyja-models/freyja-models/freyja-models.module';
import { GuildRepository } from '@freyja-models/freyja-models/repositories/guild/guild.repository';
import { RatingTypeRepository } from '@freyja-models/freyja-models/repositories/rating-type/rating-type.repository';
import { UserRepository } from '@freyja-models/freyja-models/repositories/user/user.repository';
import { Logger, Module } from '@nestjs/common';

import { DiscordService } from '../../common/shared/services/discord/discord.service';

import { GuildController } from './controllers/guild/guild.controller';
import { GuildService } from './services/guild/guild.service';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [GuildController],
  imports: [
    FreyjaModelsModule.forFeature([
      GuildRepository,
      UserRepository,
      RatingTypeRepository,
    ]),
  ],
  providers: [GuildService, Logger, DiscordService, UserService],
})
export class CommonModule {}
