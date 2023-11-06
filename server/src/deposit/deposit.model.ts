import {Model, BelongsTo, Column, DataType, Table, ForeignKey} from "sequelize-typescript";
import {User} from "../user/user.model";

interface DepositCreationAttrs {
    from: string;
    to: string;
    balance: number;
    startDate: Date;
    endDate: Date;
    rate: number;
    userId: number;
}

@Table({tableName: 'deposit'})
export class Deposit extends Model<Deposit, DepositCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    from: string;

    @Column({type: DataType.STRING, allowNull: false})
    to: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    balance: number;

    @Column({type: DataType.DATE, allowNull: false})
    startDate: Date;

    @Column({type: DataType.DATE, allowNull: false})
    endDate: Date;

    @Column({type: DataType.INTEGER, allowNull: false})
    rate: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    owner: User;
}