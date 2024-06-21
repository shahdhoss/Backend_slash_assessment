import { IsIn, IsInt, IsNotEmpty, IsNumber } from "class-validator"
import{ApiProperty} from'@nestjs/swagger'

export class add_to_cart{
    @ApiProperty({ type:Number, description: 'ID of a product' })
    @IsInt()
    @IsNotEmpty()
    productId:number
    @ApiProperty({ type:Number, description: 'ID of a user' })
    @IsInt()
    @IsNotEmpty()
    userId:number
    @ApiProperty({ type:Number, description: 'quantity of a product to be added' })
    @IsInt()
    @IsNotEmpty()
    quantity:number
}

export class remove_product{
    @ApiProperty({ type:Number, description: 'ID of the user' })
    @IsInt()
    @IsNotEmpty()
    userId:number
    @ApiProperty({ type:Number, description: 'ID of a product' })
    @IsInt()
    @IsNotEmpty()
    productId:number
}

export class user_id{
    @ApiProperty({ type:Number, description: 'ID of the user' })
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    userId:number
}
