import { Test, TestingModule } from '@nestjs/testing';
import { OrderControllerController } from './order_controller.controller';

describe('OrderControllerController', () => {
  let controller: OrderControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderControllerController],
    }).compile();

    controller = module.get<OrderControllerController>(OrderControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
