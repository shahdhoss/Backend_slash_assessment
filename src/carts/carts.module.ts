import { Module } from '@nestjs/common';
import { CartServiceService } from './cart_service/cart_service.service';
import { CartControllerController } from './cart_controller/cart_controller.controller';

@Module({
  providers: [CartServiceService],
  controllers: [CartControllerController]
})
export class CartsModule {}
