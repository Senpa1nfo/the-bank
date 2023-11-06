import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {TransactionService} from "./transaction.service";
import {Transaction} from "./transaction.model";
import {CreateTransactionDto} from "./dto/create.transaction.dto";

@Controller('transaction')
export class TransactionController {

    constructor(private transactionService: TransactionService) {
    }

    @ApiOperation({summary: 'Отримання транзакцій'})
    @ApiResponse({status: 200, type: Transaction})
    @Get(':cardNumber')
    async getAll(@Param() {cardNumber}) {
        return await this.transactionService.getAll(cardNumber);
    }

    @ApiOperation({summary: 'Створення карти'})
    @ApiResponse({status: 200, type: Transaction})
    @Post()
    async create(@Body() transactionDto: CreateTransactionDto) {
        return await this.transactionService.create(transactionDto);
    }
}
