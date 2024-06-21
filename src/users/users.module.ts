import { Module } from '@nestjs/common';
import { UsersControllerController } from './users_controller/users_controller.controller';
import { UsersServiceService } from './users_service/users_service.service';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [UsersControllerController],
  providers: [UsersServiceService],
   imports:[PrismaModule]
})
export class UsersModule {}
