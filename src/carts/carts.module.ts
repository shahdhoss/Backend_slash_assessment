import { Module } from '@nestjs/common';
import { CartServiceService } from './cart_service/cart_service.service';
import { CartControllerController } from './cart_controller/cart_controller.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CartServiceService],
  controllers: [CartControllerController],
  imports :[PrismaModule]
})
export class CartsModule {}
