import {Model, BelongsTo, Column, DataType, Table, ForeignKey} from "sequelize-typescript";
import {User} from "../user/user.model";

interface CreditCreationAttrs {
    from: string;
    to: string;
    balance: number;
    startDate: Date;
    endDate: Date;
    rate: number;
    payments: number;
    userId: number;
}

@Table({tableName: 'credit'})
export class Credit extends Model<Credit, CreditCreationAttrs> {

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

    @Column({type: DataType.INTEGER, allowNull: false})
    payments: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    owner: User;
}