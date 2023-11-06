import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Credit} from "./credit.model";

@Module({
  providers: [CreditService],
  controllers: [CreditController],
  imports: [
    SequelizeModule.forFeature([Credit, User])
  ]
})
export class CreditModule {}
