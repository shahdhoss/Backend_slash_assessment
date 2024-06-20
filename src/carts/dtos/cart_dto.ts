import { IsIn, IsInt, IsNotEmpty, IsNumber } from "class-validator"

export class add_to_cart{
    @IsInt()
    @IsNotEmpty()
    userId:number
    @IsInt()
    @IsNotEmpty()
    productId:number
    @IsInt()
    @IsNotEmpty()
    quantity:number
}

export class remove_product{
    @IsInt()
    @IsNotEmpty()
    userId:number
    @IsInt()
    @IsNotEmpty()
    productId:number
}

