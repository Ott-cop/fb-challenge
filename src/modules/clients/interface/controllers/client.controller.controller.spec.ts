import { Test, TestingModule } from '@nestjs/testing';
import { ClientControllerController } from './client.controller.controller';

describe('ClientControllerController', () => {
  let controller: ClientControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientControllerController],
    }).compile();

    controller = module.get<ClientControllerController>(ClientControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
