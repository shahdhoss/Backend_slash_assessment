import { Body, Controller,Param,Post,Get, Put,ParseIntPipe} from '@nestjs/common';
import { OrderServiceService } from '../order_service/order_service.service';
import { apply_coupon, update_status, user_id } from '../dtos/orders';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiBody,ApiOperation} from '@nestjs/swagger';

@Controller('orders')
export class OrderControllerController {
    constructor( private orderService:OrderServiceService){}

    @Post('')
    @ApiOperation({ summary: 'Create a new order' })
    @ApiCreatedResponse({ description: 'Creates a new order, pass user ID as a parameter, pass user id as 1 to see it working' })
    @ApiBody({ type: user_id })
    async createOrder(@Body() createOrder: user_id) {
        return this.orderService.create_order(createOrder.userId);
  }

    @Get(':orderId')
    @ApiOperation({ summary: 'Gets order using order id' })
    @ApiCreatedResponse({ description: 'Gets order using order id, pass order ID as a parameter, pass 1 to see it working' })
    async getOrder_byId(@Param('orderId', ParseIntPipe) orderId: number) {
        return this.orderService.get_orderById(orderId);
    }

    @Put(':orderId/status')
    @ApiOperation({ summary: 'Updates orders status' })
    @ApiCreatedResponse({ description: 'Updates orders status, pass order id as 1 to see it working' })
    @ApiBody({ type: update_status })
    async updateStatus(@Body() params:update_status){
        const {orderId ,status }=params
        this.orderService.update_order_status(orderId,status)
    }

    @Post('apply-coupon')
    @ApiOperation({ summary: 'Applys discount coupons on orders' })
    @ApiCreatedResponse({ description: 'Applys discount coupons on orders, pass user id as 1 to see it working' })
    @ApiBody({ type: apply_coupon })
    async apply_coupon(@Body() params:apply_coupon){
        const {percentage,userId}=params
        this.orderService.apply_coupon(percentage,userId)
    }
}
