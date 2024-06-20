import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartServiceService } from 'src/carts/cart_service/cart_service.service';

@Injectable()
export class OrderServiceService {
    constructor(private prisma: PrismaService, private cartService: CartServiceService){}

    //continue please
    // async create_order(user_id:number){
    //     cart_id = await this.cartService.get_cart_byUserId(user_id)

    // }
}
