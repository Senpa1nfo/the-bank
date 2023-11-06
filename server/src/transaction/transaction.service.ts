import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Transaction} from "./transaction.model";
import {CreateTransactionDto} from "./dto/create.transaction.dto";
import {CardService} from "../card/card.service";

@Injectable()
export class TransactionService {

    constructor(@InjectModel(Transaction) private transactionRepository: typeof Transaction,
                private cardService: CardService) {
    }

    async create({amount, fromCardNumber, toCardNumber}: CreateTransactionDto) {
        const firstCard = await this.cardService.getOne(fromCardNumber)

        if (firstCard.balance < amount) {
            throw new HttpException('Недостатньо коштів', HttpStatus.BAD_REQUEST)
        }

        const secondCard = await this.cardService.getOne(toCardNumber)

        await this.cardService.decreaseBalance(fromCardNumber, amount)
        const transaction = await this.transactionRepository.create({
            from: firstCard.owner.name,
            fromCardNumber: fromCardNumber,
            to: secondCard.owner.name,
            toCardNumber: toCardNumber,
            amount: -amount,
            date: new Date(),
            cardId: firstCard.id
        })

        await this.cardService.increaseBalance(toCardNumber, amount)
        await this.transactionRepository.create({
            from: firstCard.owner.name,
            fromCardNumber: fromCardNumber,
            to: secondCard.owner.name,
            toCardNumber: toCardNumber,
            amount: amount,
            date: new Date(),
            cardId: secondCard.id
        })
        return transaction;
    }

    async getAll(cardNumber: string) {
        const card = await this.cardService.getOne(cardNumber)
        return await this.transactionRepository.findAll({where: {cardId: card.id}})
    }
}
