import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Кушнір Єгор', description: "Повне ім'я"})
    readonly name: string;

    @ApiProperty({example: 'user@email.com', description: 'Пошта'})
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    readonly password: string;

    @ApiProperty({example: 10000, description: 'Заробітня плата'})
    readonly salary: number;
}