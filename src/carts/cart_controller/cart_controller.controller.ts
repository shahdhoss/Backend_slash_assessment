import { Body, Controller, Get, Post, UseInterceptors, UsePipes, ValidationPipe,Param, Put ,Delete} from '@nestjs/common';
import { CartServiceService } from '../cart_service/cart_service.service';
import { add_to_cart,remove_product } from '../dtos/cart_dto';
@Controller('cart')
export class CartControllerController {
    constructor(private cartService:CartServiceService){}

    @Post('add')
    @UsePipes(ValidationPipe)
    async add_to_cart(@Body() params:add_to_cart){
        const {productId,userId,quantity } = params
        this.cartService.add_to_cart(productId,userId,quantity)
    }

    @Get(':userId')
    async viewCart(@Param('userId') userId: number): Promise<string> {
      return await this.cartService.view_cart(userId)
    }

    @Put('update') 
    async updateCart(@Body() params: add_to_cart){
        const {productId, userId,quantity } = params
        await this.cartService.update_cart(userId,productId,quantity)
    }

    @Delete('remove')
    async removeProduct(@Body() params: remove_product){
        const {userId,productId} =params
        await this.cartService.remove_from_cart(userId,productId)
    }
}
