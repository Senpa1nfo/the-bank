import {Controller, Get, Param} from '@nestjs/common';
import {BankService} from "./bank.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Bank} from "./bank.model";

@ApiTags('Банк')
@Controller('bank')
export class BankController {

    constructor(private bankService: BankService) {
    }

    @ApiOperation({summary: 'Отримання'})
    @ApiResponse({status: 200, type: Bank})
    @Get('/:id')
    getBank(@Param('id') id: number) {
        return this.bankService.getBank(id);
    }
}
