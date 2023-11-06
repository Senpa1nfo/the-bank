import {Model, BelongsTo, Column, DataType, Table, ForeignKey} from "sequelize-typescript";
import {Card} from "../card/card.model";

interface TransactionCreationAttrs {
    from: string;
    fromCardNumber: string;
    to: string;
    toCardNumber: string;
    amount: number;
    date: Date;
    cardId: number;
}

@Table({tableName: 'transaction'})
export class Transaction extends Model<Transaction, TransactionCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    from: string;

    @Column({type: DataType.STRING})
    fromCardNumber: string;

    @Column({type: DataType.STRING})
    to: string;

    @Column({type: DataType.STRING})
    toCardNumber: string;

    @Column({type: DataType.INTEGER})
    amount: number;

    @Column({type: DataType.DATE})
    date: Date;

    @ForeignKey(() => Card)
    @Column({type: DataType.INTEGER})
    cardId: number;

    @BelongsTo(() => Card)
    card: Card;
}