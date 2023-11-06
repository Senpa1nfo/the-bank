import {Module} from '@nestjs/common';
import {TransactionController} from './transaction.controller';
import {TransactionService} from './transaction.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Transaction} from "./transaction.model";
import {Card} from "../card/card.model";
import {CardModule} from "../card/card.module";

@Module({
    controllers: [TransactionController],
    providers: [TransactionService],
    imports: [
        SequelizeModule.forFeature([Transaction, Card]),
        CardModule
    ]
})
export class TransactionModule {
}
