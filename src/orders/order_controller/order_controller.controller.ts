import { Body, Controller,Param,Post,Get, Put,ParseIntPipe} from '@nestjs/common';
import { OrderServiceService } from '../order_service/order_service.service';
import { apply_coupon, update_status } from '../dtos/update_status';

@Controller('orders')
export class OrderControllerController {
    constructor( private orderService:OrderServiceService){}

    @Post('')
    async createOrder(@Body('userId') userId: number) {
        return this.orderService.create_order(userId);
    }

    @Get(':orderId')
    async getOrder_byId(@Param('orderId', ParseIntPipe) orderId: number) {
        return this.orderService.get_orderById(orderId);
    }

    @Put(':orderId/status')
    async updateStatus(@Body() params:update_status){
        const {orderId ,status }=params
        this.orderService.update_order_status(orderId,status)
    }

    @Post('apply-coupon')
    async apply_coupon(@Body() params:apply_coupon){
        const {percentage,userId}=params
        this.orderService.apply_coupon(percentage,userId)
    }
}
