import { Body, Controller, Get, Post, UseInterceptors, UsePipes, ValidationPipe,Param, Put ,Delete,ParseIntPipe} from '@nestjs/common';
import { CartServiceService } from '../cart_service/cart_service.service';
import { add_to_cart,remove_product, user_id } from '../dtos/cart_dto';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiBody,ApiOperation} from '@nestjs/swagger';

@Controller('cart')
export class CartControllerController {
    constructor(private cartService:CartServiceService){}

    @Post('add')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Adds products to carts' })
    @ApiCreatedResponse({ description: 'Adds products to carts, pass product id as 1 and user id as 1 to see it working' })
    @ApiBody({ type: add_to_cart })
    async add_to_cart(@Body() params:add_to_cart){
        const {productId,userId,quantity } = params
        this.cartService.add_to_cart(productId,userId,quantity)
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Views a users cart' })
    @ApiCreatedResponse({ description: 'Views a users cart, pass user id as 1 to see it working' })
    async viewCart(@Param('userId', ParseIntPipe) userId:number): Promise<string> {
      return await this.cartService.view_cart(userId)
    }

    @Put('update') 
    @ApiOperation({summary:'Updates the quantity of a product in a cart'})
    @ApiCreatedResponse({ description: 'Adds products to carts, pass product id as 1 and user id as 1 to see it working' })
    @ApiBody({ type: add_to_cart })
    async updateCart(@Body() params: add_to_cart){
        const {productId, userId,quantity } = params
        await this.cartService.update_cart(userId,productId,quantity)
    }

    @Delete('remove')
    @ApiOperation({summary:'Removes a product completely from a cart'})
    @ApiCreatedResponse({ description: 'Removes a product completely from a cart, pass product id as 1 and user id as 1 to see it working' })
    @ApiBody({ type: remove_product })
    async removeProduct(@Body() params: remove_product){
        const {userId,productId}=params
        await this.cartService.remove_from_cart(userId,productId)
    }
}
