import { DynamicModule, Module, Provider } from '@nestjs/common';

import { database } from './database';
import { RatingTypeRepository } from './repositories/rating-type/rating-type.repository';

@Module({
  exports: [],
  providers: [RatingTypeRepository],
})
export class FreyjaModelsModule {
  static forFeature(repositories: Provider[]): DynamicModule {
    return {
      exports: repositories,
      module: FreyjaModelsModule,
      providers: [
        ...repositories,
        {
          provide: 'DATABASE',
          useValue: database,
        },
      ],
    };
  }
}
