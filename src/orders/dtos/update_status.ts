import { IsString,IsInt,IsNotEmpty, isInt, isNotEmpty } from "class-validator";


export class update_status {
    @IsInt()
    @IsNotEmpty()
    orderId: number;
    @IsString()
    @IsNotEmpty()
    status: string;
}

export class apply_coupon{
    @IsInt()
    @IsNotEmpty()
    percentage: number;
    @IsInt()
    @IsNotEmpty()
    userId: number;
}