import { Body, Controller, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartServiceService } from '../cart_service/cart_service.service';
import { addDto } from '../dtos/addDto.dto';
@Controller('cart-controller')
export class CartControllerController {
    constructor(private cartService:CartServiceService){}

    @Post()
    @UsePipes(ValidationPipe)
    add(@Body() add:addDto){
        const { productId, cartId, quantity } = add
        return this.cartService.add_to_cart(cartId,productId,quantity)
    }

}
