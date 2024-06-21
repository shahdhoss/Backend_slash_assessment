import { IsNumber,IsString,IsInt,IsNotEmpty} from "class-validator";
import{ApiProperty} from'@nestjs/swagger'

export class update_status {
    @ApiProperty({ type:Number, description: 'ID of an order' })
    @IsInt()
    @IsNotEmpty()
    orderId: number;
    @ApiProperty({ type:String, description: 'status to be updated' })
    @IsString()
    @IsNotEmpty()
    status: string;
}

export class apply_coupon{
    @ApiProperty({ type:Number, description: 'percentage of discount' })
    @IsInt()
    @IsNotEmpty()
    percentage: number;
    @ApiProperty({ type:Number, description: 'ID of the user' })
    @IsInt()
    @IsNotEmpty()
    userId: number;
}

export class user_id{
    @ApiProperty({ type:Number, description: 'ID of the user' })
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    userId:number
}