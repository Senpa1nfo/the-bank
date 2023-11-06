import {Model, Column, DataType, HasMany, Table, BelongsTo, ForeignKey, HasOne} from "sequelize-typescript";
import {Card} from "../card/card.model";
import {Bank} from "../bank/bank.model";
import {Deposit} from "../deposit/deposit.model";
import {Credit} from "../credit/credit.model";
import {ApiProperty} from "@nestjs/swagger";
import {Token} from "../token/token.model";

interface UserCreationAttrs {
    name: string;
    email: string;
    password: string;
    salary: number;
    bankId: number;
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: 1, description: 'Унікальний ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Кушнір Єгор', description: "Повне ім'я"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'user@email.com', description: 'Пошта'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 10000, description: 'Заробітня плата'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    salary: number;

    @ApiProperty({example: 1, description: 'ID Банку'})
    @ForeignKey(() => Bank)
    @Column({type: DataType.INTEGER, defaultValue: 1})
    bankId: number;

    @BelongsTo(() => Bank)
    bank: Bank;

    @HasMany(() => Card)
    cards: Card[];

    @HasMany(() => Deposit)
    deposits: Deposit[];

    @HasOne(() => Credit)
    credit: Credit;

    @HasOne(() => Token)
    refreshToken: Token;
}