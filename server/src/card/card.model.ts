import {Model, BelongsTo, Column, DataType, Table, ForeignKey, HasOne, HasMany} from "sequelize-typescript";
import {User} from "../user/user.model";
import {ApiProperty} from "@nestjs/swagger";
import {Transaction} from "../transaction/transaction.model";

interface CardCreationAttrs {
    number: string;
    date: Date;
    userId: number;
}

@Table({tableName: 'card'})
export class Card extends Model<Card, CardCreationAttrs> {
    @ApiProperty({example: 1, description: 'ID карти'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "2000001234567890", description: 'Номер карти'})
    @Column({type: DataType.STRING, unique: true})
    number: string;

    @ApiProperty({example: new Date('01.01.2030'), description: 'Термін дії'})
    @Column({type: DataType.DATE})
    date: Date;

    @ApiProperty({example: 10000, description: 'Баланс'})
    @Column({type: DataType.INTEGER, defaultValue: 10000})
    balance: number;

    @ApiProperty({example: 1, description: 'ID користувача'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    owner: User;

    @HasMany(() => Transaction)
    transactions: Transaction[];
}