import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderServiceService {
    constructor(private prisma: PrismaService){}
    //create your functions
}
