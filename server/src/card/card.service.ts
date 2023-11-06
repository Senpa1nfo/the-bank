import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Card} from "./card.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class CardService {

    constructor(@InjectModel(Card) private cardRepository: typeof Card) {
    }

    async create(userId: number) {
        const number = `200000${Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000)}`;
        const candidate = await this.getOne(number)
        if (candidate) {
            throw new HttpException('Повторіть ще раз', HttpStatus.BAD_REQUEST);
        }

        const date = new Date();
        date.setFullYear(date.getFullYear() + 5);

        return await this.cardRepository.create({userId, number, date});
    }

    async getOne(number: string) {
        return await this.cardRepository.findOne({where: {number}, include: {all: true}})
    }

    async getAll(userId: number) {
        return await this.cardRepository.findAll({where: {userId}, include: 'owner'})
    }

    async delete(id: number) {
        return await this.cardRepository.destroy({where: {id}})
    }

    async increaseBalance(number: string, amount: number) {
        const card = await this.getOne(number)
        return await card.update({balance: +card.balance + +amount})
    }

    async decreaseBalance(number: string, amount: number) {
        const card = await this.getOne(number)
        return await card.update({balance: +card.balance - +amount})
    }
}
