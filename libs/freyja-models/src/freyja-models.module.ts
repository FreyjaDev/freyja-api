import { DynamicModule, Module, Provider } from '@nestjs/common';

import { database } from './database';

@Module({
  exports: [],
  providers: [],
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
