import { Body, Controller,Param,Post } from '@nestjs/common';
import { OrderServiceService } from '../order_service/order_service.service';

@Controller('orders')
export class OrderControllerController {
    constructor( private orderService:OrderServiceService){}

    @Post(':userId')
    async createOrder(@Param('userId') userId:number){
        return this.orderService.create_order(userId)
    }
    
}
