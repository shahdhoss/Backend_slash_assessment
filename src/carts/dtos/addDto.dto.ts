import { IsIn, IsInt, IsNotEmpty, IsNumber } from "class-validator"

export class addDto{
    @IsInt()
    @IsNotEmpty()
    productId:number
    @IsInt()
    @IsNotEmpty()
    cartId:number
    @IsInt()
    @IsNotEmpty()
    quantity:number
}