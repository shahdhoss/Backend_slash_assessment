
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class OrderServiceService {
    constructor(private prisma: PrismaService){}

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

    async create_order(user_id:number){
        const cart_id = await this.get_cart_byUserId(user_id)
        const cartItems = await this.prisma.$queryRaw<{ productId: number, quantity:number }[]> `select "productId", quantity from "cartsOnProducts" where "cartId"=${cart_id}`
        const productIds = cartItems.map(item => item.productId);
        const quantities = cartItems.map(item => item.quantity);

        let total:number = 0;
        for (let i = 0; i < productIds.length; i++) {
            const result = await this.prisma.$queryRaw<{ price: number }[]>`select price from products where id=${productIds[i]}`
                if (result.length > 0) {
                    const cost = result[0].price; 
                    console.log("cost is: ", cost)
                    console.log("quantities: ",quantities[i])
                    total += (cost * quantities[i]);
                    console.log("total: ", total)
                }
            }
        const insertedOrder = await this.prisma.$queryRaw<{ id: number }[]>`insert into orders (status ,"userId", cost) values (${'placed'},${user_id}, ${total})
        returning id`
        const order_id=insertedOrder[0].id
        for(let i=0;i<productIds.length;i++){
            await this.prisma.$executeRaw`insert into "ordersOnProducts" ("orderId","productId") values (${order_id},${productIds[i]}) `
        }
    }

    async get_orderById(order_id:number) {
        var orderDetails = await this.prisma.$queryRaw<{orderDate: Date,arrivalDate: Date,status:string, cost:number,userId: number}[]>
        `select "orderDate","arrivalDate" status , cost, "userId" from orders where id=${order_id}`
        return {
            orderDate: orderDetails[0].orderDate,
            arrivalDate: orderDetails[0].arrivalDate,
            status: orderDetails[0].status,
            cost: orderDetails[0].cost,
            userId: Number(orderDetails[0].userId),
        }
    }

    async update_order_status(order_id:number, status:string){
        await this.prisma.$executeRaw`update orders set status = ${status} where id = ${order_id}`
    }
}
