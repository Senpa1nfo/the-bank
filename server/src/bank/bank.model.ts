import {Model, Column, DataType, Table, HasMany} from "sequelize-typescript";
import {User} from "../user/user.model";
import {ApiProperty} from "@nestjs/swagger";

interface BankCreationAttrs {
    balance: number;
}

@Table({tableName: 'bank', createdAt: false, updatedAt: false})
export class Bank extends Model<Bank, BankCreationAttrs> {

    @ApiProperty({example: 1, description: 'Унікальний ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1000000, description: 'Баланс'})
    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 1000000000})
    balance: number;

    @HasMany(() => User)
    users: User[];
}