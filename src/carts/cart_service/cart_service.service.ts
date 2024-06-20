import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartServiceService {
    constructor(private prisma :PrismaService ){}
    add_to_cart(product_id:number,cart_id:number,quantity:number){
       return this.prisma.$queryRaw `insert into "cartsOnProducts" ("cartId", "productId", "quantity")
       values (${cart_id}, ${product_id}, ${quantity})
        on conflict ("cartId", "productId") do update
        set quantity = "cartsOnProducts".quantity + ${quantity}`
    }
    view_cart(user_id: number){
        return this.prisma.$queryRaw `select name from products.name where products.id in (select "productId" from "cartsonProducts" where "cartId" in (select carts.id from carts where userId=${user_id}))`
    }
    update_cart(cart_id:number,product_id:number,new_quantity:number){
        return this.prisma.$queryRaw `update "cartsOnProducts"
        set quantity = ${new_quantity}
        where "cartId" = ${cart_id} and "productId" = ${product_id}`
    }
    remove_from_cart(cart_id:number,product_id:number){
        return this.prisma.$queryRaw `delete from "cartsOnProducts" where "cartId" = ${cart_id} and "productId" =${product_id}`
    }   
}
