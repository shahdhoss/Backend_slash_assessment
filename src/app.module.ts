import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [OrdersModule, CartsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
