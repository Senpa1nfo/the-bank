import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Bank} from "./bank.model";
import {User} from "../user/user.model";

@Module({
  controllers: [BankController],
  providers: [BankService],
  imports: [
      SequelizeModule.forFeature([Bank, User])
  ],
    exports: [BankService]
})
export class BankModule {}
