import { Test, TestingModule } from '@nestjs/testing';
import { RatingTypeController } from './rating-type.controller';

describe('RatingTypeController', () => {
  let controller: RatingTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingTypeController],
    }).compile();

    controller = module.get<RatingTypeController>(RatingTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
