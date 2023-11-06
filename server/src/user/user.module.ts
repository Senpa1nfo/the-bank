import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Bank} from "../bank/bank.model";
import {Card} from "../card/card.model";
import {Deposit} from "../deposit/deposit.model";
import {Credit} from "../credit/credit.model";
import {BankModule} from "../bank/bank.module";
import {Token} from "../token/token.model";
import {TokenModule} from "../token/token.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([User, Bank, Card, Deposit, Credit, Token]),
        BankModule,
        TokenModule
    ],
    exports: [
        UserService
    ]
})
export class UserModule {
}
