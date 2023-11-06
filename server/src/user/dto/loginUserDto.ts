import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({example: 'user@email.com', description: 'Пошта'})
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    readonly password: string;
}