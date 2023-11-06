import { Module } from '@nestjs/common';
import {CardController} from "./card.controller";
import {CardService} from "./card.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Card} from "./card.model";

@Module({
    controllers: [CardController],
    providers: [CardService],
    imports: [
        SequelizeModule.forFeature([Card, User])
    ],
    exports: [
        CardService
    ]
})
export class CardModule {}
