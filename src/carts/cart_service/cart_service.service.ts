import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartServiceService {
    constructor(private prisma :PrismaService ){}

    async get_cart_byUserId(user_id: number): Promise<number> {
        const cart = await this.prisma.$queryRaw<{ id: number }[]>`select id from carts where"userId" = ${user_id}`
        if (cart.length > 0) {
          const cart_id = cart[0].id;
          console.log(cart_id);
          return cart_id;
        } else {
          throw new Error(`Cart not found for userId: ${user_id}`);
        }
      }
    async add_to_cart(product_id: number, user_id: number, quantity: number): Promise<void> {
        try {
          const cart_id = await this.get_cart_byUserId(user_id);
          await this.prisma.$executeRaw`insert into "cartsOnProducts" ("cartId", "productId", "quantity")
          values (${BigInt(cart_id)}, ${product_id}, ${quantity})
          on CONFLICT ("cartId", "productId") do update
          set "quantity" = "cartsOnProducts"."quantity" + ${quantity};`
        } catch (error) {
          throw new Error(`Failed to add to cart: ${error.message}`);
        }
    }
      
    async view_cart(user_id: number): Promise<string> {
        const products = await this.prisma.$queryRaw<{ name: string }[]>`
        select products.name from products where products.id in 
        (select "productId" from "cartsOnProducts" where "cartId" in (select carts.id from carts where "userId" = ${user_id}::bigint))`;
        const productNames = products.map(product => product.name);
        const result = productNames.join(', ');
        console.log(result);
        return result;
      }
    update_cart(user_id:number,product_id:number,new_quantity:number){
        const cart_id=this.get_cart_byUserId(user_id)
        this.prisma.$executeRaw `update "cartsOnProducts"
        set quantity = ${new_quantity}
        where "cartId" = ${cart_id} and "productId" = ${product_id}`
    }
    remove_from_cart(user_id:number,product_id:number){
        const cart_id=this.get_cart_byUserId(user_id)
        this.prisma.$executeRaw `delete from "cartsOnProducts" where "cartId" = ${cart_id} and "productId" =${product_id}`
    }   
}
