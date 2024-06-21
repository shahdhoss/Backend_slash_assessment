import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    async calculate_total(product_ids,quantities){
        let total = 0;
        for (let i = 0; i < product_ids.length; i++) {
            const result = await this.prisma.$queryRaw<{ price: number }[]>`select price from products where id=${product_ids[i]}`
                if (result.length > 0) {
                    const cost = result[0].price as number; 
                    total = total+(cost * quantities[i]);
                }
            }
        return total
    }

    async create_order(user_id:number){
        const cart_id = await this.get_cart_byUserId(user_id)
        const cartItems = await this.prisma.$queryRaw<{ productId: number, quantity:number }[]> `select (productId,quantity) from "cartsOnProducts" where cartId=${cart_id}`
        const productIds = cartItems.map(item => item.productId);
        const quantities = cartItems.map(item => item.quantity);
        var total=this.calculate_total(productIds,quantities)
        const insertedOrder = await this.prisma.$queryRaw<{ id: number }[]>`insert into orders (status,userId, cost) values (${"placed"},${user_id}, ${total})
        returning id`
        const order_id=insertedOrder[0].id
        for(let i=0;i<productIds.length;i++){
            await this.prisma.$executeRaw`insert into ordersOnProducts (orderId,productId) values (${order_id},${productIds[i]}) `
        }
    }

    async get_orderById(order_id: number) {
        const orderDetailsfromOrders = await this.prisma.$queryRaw<{orderDate: Date,arrivalDate: Date,status: string,cost: number,userId: number}[]>
            `select orderDate, arrivalDate, status, cost, userId from orders where id=${order_id}`
        const products =await this.prisma.$queryRaw<{productIds:number}[]>`select productId from "ordersOnProducts" where orderId=${order_id}`
        const product_ids= products.map(items =>items.productIds)
        const productDetails = await this.prisma.$queryRaw<{name: string, description: string, price: number }[]>
        `select name, description, price from products where id in (${product_ids.join(',')})`
        if (orderDetailsfromOrders.length > 0) {
            const order = orderDetailsfromOrders[0];
            const {orderDate, arrivalDate, status, cost, userId } = order;
            return {order: {orderDate,arrivalDate,status,cost,userId}, productDetails}
        } else {
            throw new Error(`Order with ID ${order_id} not found`);
        }
    }
    
    async update_order_status(order_id:number, status:string){
        await this.prisma.$executeRaw`update orders set status = ${status} where id = ${order_id}`
    }
}
