import { Module } from '@nestjs/common';
import { OrderControllerController } from './order_controller/order_controller.controller';
import { OrderServiceService } from './order_service/order_service.service';

@Module({
  controllers: [OrderControllerController],
  providers: [OrderServiceService]
})
export class OrdersModule {}
