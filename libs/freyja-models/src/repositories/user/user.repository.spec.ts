import { SnowflakeId, ULID } from '@freyja-models/freyja-models';
import { User } from '@freyja-models/freyja-models/entities';
import { FreyjaModelsModule } from '@freyja-models/freyja-models/freyja-models.module';
import { Test, TestingModule } from '@nestjs/testing';
import { ulid } from 'ulidx';

import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let service: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FreyjaModelsModule.forFeature([UserRepository])],
    }).compile();

    service = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created a new entity', async () => {
    // Create a user.
    const userId = new ULID(ulid());
    const userSnowflakeId = new SnowflakeId('123456789012345678');

    const user = User.create({
      discordId: userSnowflakeId.value(),
      id: userId.value(),
    });
    await service.save(user);

    const fetchedUser = await service.findBySnowflakeId(userSnowflakeId);

    expect(fetchedUser).not.toEqual(undefined);
    expect(fetchedUser?.id).toEqual(userId);
    expect(fetchedUser?.discordId).toEqual(userSnowflakeId);
  });
});
