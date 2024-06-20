import { Module } from '@nestjs/common';
import { OrderControllerController } from './order_controller/order_controller.controller';
import { OrderServiceService } from './order_service/order_service.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OrderControllerController],
  providers: [OrderServiceService],
  imports:[PrismaModule]
})
export class OrdersModule {}
