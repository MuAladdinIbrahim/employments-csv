import { Test, TestingModule } from '@nestjs/testing';
import { AssetManagerController } from './asset-manager.controller';

describe('AssetManagerController', () => {
  let controller: AssetManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetManagerController],
    }).compile();

    controller = module.get<AssetManagerController>(AssetManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
