import {ApiProperty} from "@nestjs/swagger";

export class CreateTransactionDto {
    @ApiProperty({example: 10000, description: 'Заробітня плата'})
    readonly amount: number;

    @ApiProperty({example: "2000001234567890", description: 'Номер карти'})
    readonly fromCardNumber: string;

    @ApiProperty({example: "2000001234567890", description: 'Номер карти'})
    readonly toCardNumber: string;
}