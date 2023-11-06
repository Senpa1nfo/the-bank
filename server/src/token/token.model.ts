import {Model, Column, DataType, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/user.model";

interface TokenCreationAttrs {
    refreshToken: string;
    userId: number;
}

@Table({tableName: 'token'})
export class Token extends Model<Token, TokenCreationAttrs> {

    @ApiProperty({example: 'refreshToken', description: "refreshToken"})
    @Column({type: DataType.STRING})
    refreshToken: string;

    @ApiProperty({example: 1, description: 'ID користувача'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;
}