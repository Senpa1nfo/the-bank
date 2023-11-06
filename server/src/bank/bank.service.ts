import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Bank} from "./bank.model";

@Injectable()
export class BankService {

    constructor(@InjectModel(Bank) private bankRepository: typeof Bank) {
    }

    async getBank(id: number) {
        return await this.bankRepository.findOne({where: {id}})
    }
}
