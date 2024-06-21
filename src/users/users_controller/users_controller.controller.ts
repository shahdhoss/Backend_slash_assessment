import { Controller, Get,Param,ParseIntPipe} from '@nestjs/common';
import { UsersServiceService } from '../users_service/users_service.service';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOperation} from '@nestjs/swagger'
@Controller('users')
export class UsersControllerController {
    constructor(private userService: UsersServiceService){}
    
    @Get(':userId/orders')
    @ApiOperation({ summary: 'Views a users order history' })
    @ApiCreatedResponse({ description: 'Views a users order history, pass user id as 1 to see it working' })

    async order_history(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.order_history(userId);
    }
}
