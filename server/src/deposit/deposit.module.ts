import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Deposit} from "./deposit.model";
import {User} from "../user/user.model";

@Module({
  controllers: [DepositController],
  providers: [DepositService],
  imports: [
      SequelizeModule.forFeature([Deposit, User])
  ]
})
export class DepositModule {}
