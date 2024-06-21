import { IsString,IsInt,IsNotEmpty, isInt, isNotEmpty } from "class-validator";


export class update_status {
    @IsInt()
    @IsNotEmpty()
    orderId: number;
    @IsString()
    @IsNotEmpty()
    status: string;
}

export class order_id{
    @IsInt()
    @IsNotEmpty()
    orderId:number
}
