import { Controller, Get,Param,ParseIntPipe} from '@nestjs/common';
import { UsersServiceService } from '../users_service/users_service.service';

@Controller('users')
export class UsersControllerController {
    constructor(private userService: UsersServiceService){}
    @Get(':userId/orders')
    async order_history(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.order_history(userId);
    }
}
