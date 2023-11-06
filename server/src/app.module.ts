import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModule} from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import {DepositModule} from './deposit/deposit.module';
import {CreditModule} from './credit/credit.module';
import {CardModule} from './card/card.module';
import {TransactionModule} from './transaction/transaction.module';
import {BankModule} from './bank/bank.module';
import {AuthModule} from './auth/auth.module';
import {User} from "./user/user.model";
import {Card} from "./card/card.model";
import {Bank} from "./bank/bank.model";
import {Deposit} from "./deposit/deposit.model";
import {Credit} from "./credit/credit.model";
import {Transaction} from "./transaction/transaction.model";
import {TokenModule} from './token/token.module';
import {Token} from "./token/token.model";
import * as process from "process";

@Module({
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.localhost,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Bank, User, Card, Deposit, Credit, Transaction, Token],
            autoLoadModels: true
        }),
        UserModule,
        DepositModule,
        CreditModule,
        CardModule,
        TransactionModule,
        BankModule,
        AuthModule,
        TokenModule,
    ]
})
export class AppModule {

}