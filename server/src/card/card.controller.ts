import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CardService} from "./card.service";
import {Card} from "./card.model";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Карта')
@Controller('card')
export class CardController {

    constructor(private cardService: CardService) {
    }

    @ApiOperation({summary: 'Отримання карт'})
    @ApiResponse({status: 200, type: Card})
    @Get(':userId')
    async getAll(@Param() {userId}) {
        return await this.cardService.getAll(userId);
    }

    @ApiOperation({summary: 'Отримання карти'})
    @ApiResponse({status: 200, type: Card})
    @Get('/get-one/:number')
    async getOne(@Param() {number}) {
        return await this.cardService.getOne(number);
    }

    @ApiOperation({summary: 'Створення карти'})
    @ApiResponse({status: 200, type: Card})
    @Post(':id')
    async create(@Param() {id}) {
        return await this.cardService.create(id);
    }

    @ApiOperation({summary: 'Видалення карти'})
    @ApiResponse({status: 200, type: Card})
    @Delete(':id')
    async delete(@Param() {id}) {
        return await this.cardService.delete(id);
    }

    @ApiOperation({summary: 'Поповнення балансу'})
    @ApiResponse({status: 200, type: Card})
    @Patch('increase/:number')
    async increaseBalance(@Param() {number}, @Body() {amount}) {
        return await this.cardService.increaseBalance(number, amount)
    }

    @ApiOperation({summary: 'Зняття з балансу'})
    @ApiResponse({status: 200, type: Card})
    @Patch('decrease/:number')
    async decreaseBalance(@Param() {number}, @Body() {amount}) {
        return await this.cardService.decreaseBalance(number, amount)
    }
}
