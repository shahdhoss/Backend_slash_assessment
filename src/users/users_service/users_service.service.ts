import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersServiceService {
    constructor(private prisma: PrismaService){}
    async order_history(user_id:number){
        var orderDetails = await this.prisma.$queryRaw<{ id:number, orderDate: Date,arrivalDate: Date,status:string, cost:number}[]>
        `select "orderDate","arrivalDate" status , cost, "userId" from orders where "userId"=${user_id}`
        const convertedOrderDetails = orderDetails.map(order => ({
            id: Number(order.id),
            orderDate: order.orderDate,
            arrivalDate: order.arrivalDate,
            status: order.status,
            cost: order.cost,
        }));
        return { orderDetails: convertedOrderDetails };
    }
}
