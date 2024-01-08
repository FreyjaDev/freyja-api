import { DynamicModule, Module, Provider } from '@nestjs/common';

import { database } from './database';

@Module({
  exports: [],
  providers: [
    {
      provide: 'DATABASE',
      useValue: database,
    },
  ],
})
export class FreyjaModelsModule {
  static forFeature(repositories: Provider[]): DynamicModule {
    return {
      exports: repositories,
      module: FreyjaModelsModule,
      providers: repositories,
    };
  }
}
